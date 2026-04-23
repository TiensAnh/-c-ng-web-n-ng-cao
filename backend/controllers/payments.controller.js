const jwt = require('jsonwebtoken');
const db = require('../config/db');

const ALLOWED_METHODS = ['CASH', 'BANK_TRANSFER', 'MOMO', 'VNPAY'];
const ONLINE_PAYMENT_METHODS = ['MOMO', 'VNPAY'];

function normalizeMethod(method = '') {
  return String(method).trim().toUpperCase();
}

function buildPendingPaymentMessage(method) {
  if (method === 'BANK_TRANSFER') {
    return 'Da tao yeu cau chuyen khoan. Vui long chuyen tien va cho admin xac nhan.';
  }

  if (method === 'CASH') {
    return 'Da ghi nhan yeu cau thanh toan tien mat. Booking se duoc xac nhan sau khi admin kiem tra.';
  }

  if (method === 'MOMO' || method === 'VNPAY') {
    return 'Dang chuyen huong den cong thanh toan. Vui long hoan tat giao dich de quay lai website.';
  }

  return 'Da tao yeu cau thanh toan thanh cong.';
}

function isOnlineMethod(method) {
  return ONLINE_PAYMENT_METHODS.includes(method);
}

function getFrontendBookingUrl(searchParams = {}) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const url = new URL('/my-bookings', frontendUrl);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function buildCheckoutUrl(req, paymentId, userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Server chua duoc cau hinh JWT_SECRET.');
  }

  const token = jwt.sign(
    {
      type: 'payment_checkout',
      paymentId,
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30m' },
  );

  return `${req.protocol}://${req.get('host')}/api/payments/checkout?token=${encodeURIComponent(token)}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function getPaymentByCheckoutToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Server chua duoc cau hinh JWT_SECRET.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.type !== 'payment_checkout' || !decoded.paymentId || !decoded.userId) {
    throw new Error('Token thanh toan khong hop le.');
  }

  const [rows] = await db.query(
    `SELECT p.id, p.booking_id, p.amount, p.method, p.status, p.paid_at,
            b.user_id, b.status AS booking_status,
            t.title AS tour_title
     FROM payments p
     JOIN bookings b ON b.id = p.booking_id
     JOIN tours t ON t.id = b.tour_id
     WHERE p.id = ? AND b.user_id = ? LIMIT 1`,
    [decoded.paymentId, decoded.userId],
  );

  if (rows.length === 0) {
    throw new Error('Khong tim thay giao dich thanh toan.');
  }

  return rows[0];
}

async function updatePaymentResult(payment, result) {
  if (payment.status === 'SUCCESS' || payment.status === 'FAILED') {
    return payment.status;
  }

  if (payment.booking_status === 'CANCELLED') {
    return 'CANCELLED';
  }

  if (result === 'success') {
    const paidAt = new Date();

    await db.query(
      "UPDATE payments SET status = 'SUCCESS', paid_at = ? WHERE id = ?",
      [paidAt, payment.id],
    );

    await db.query(
      "UPDATE bookings SET status = 'CONFIRMED' WHERE id = ? AND status = 'PENDING'",
      [payment.booking_id],
    );

    return 'SUCCESS';
  }

  await db.query(
    "UPDATE payments SET status = 'FAILED', paid_at = NULL WHERE id = ?",
    [payment.id],
  );

  return 'FAILED';
}

// POST /api/payments
// User thanh toán cho booking
exports.createPayment = async (req, res) => {
  const userId = req.user.id;
  const { booking_id, method } = req.body;
  const normalizedMethod = normalizeMethod(method);

  if (!booking_id || !method) {
    return res.status(400).json({ message: 'Vui long cung cap booking_id va method.' });
  }

  if (!ALLOWED_METHODS.includes(normalizedMethod)) {
    return res.status(400).json({
      message: `Phuong thuc thanh toan khong hop le. Cho phep: ${ALLOWED_METHODS.join(', ')}`,
    });
  }

  try {
    // Kiểm tra booking thuộc về user này
    const [bookings] = await db.query(
      'SELECT id, status, total_price FROM bookings WHERE id = ? AND user_id = ? LIMIT 1',
      [Number(booking_id), userId],
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Khong tim thay booking.' });
    }

    const booking = bookings[0];

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ message: 'Booking nay da bi huy, khong the thanh toan.' });
    }

    if (booking.status === 'COMPLETED') {
      return res.status(400).json({ message: 'Booking nay da hoan thanh.' });
    }

    // Khong cho tao giao dich moi neu booking da thanh toan xong
    const [successfulPayments] = await db.query(
      "SELECT id FROM payments WHERE booking_id = ? AND status = 'SUCCESS' LIMIT 1",
      [booking_id],
    );

    if (successfulPayments.length > 0) {
      return res.status(400).json({ message: 'Booking nay da duoc thanh toan thanh cong roi.' });
    }

    const [pendingPayments] = await db.query(
      "SELECT id, method, status FROM payments WHERE booking_id = ? AND status = 'PENDING' ORDER BY id DESC LIMIT 1",
      [booking_id],
    );

    if (pendingPayments.length > 0) {
      return res.status(409).json({
        message: 'Booking nay da co yeu cau thanh toan dang cho xac nhan.',
        payment: pendingPayments[0],
      });
    }

    const [result] = await db.query(
      'INSERT INTO payments (booking_id, amount, method, status, paid_at) VALUES (?, ?, ?, ?, ?)',
      [booking_id, booking.total_price, normalizedMethod, 'PENDING', null],
    );

    const payment = {
      id: result.insertId,
      booking_id: Number(booking_id),
      amount: booking.total_price,
      method: normalizedMethod,
      status: 'PENDING',
      paid_at: null,
    };

    return res.status(201).json({
      message: buildPendingPaymentMessage(normalizedMethod),
      payment,
      checkout_url: isOnlineMethod(normalizedMethod)
        ? buildCheckoutUrl(req, payment.id, userId)
        : null,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Khong the xu ly thanh toan luc nay.', error: error.message });
  }
};

// GET /api/payments/checkout?token=...
// Trang thanh toan mo phong cho MoMo / VNPay
exports.renderPaymentCheckout = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Thieu token thanh toan.');
  }

  try {
    const payment = await getPaymentByCheckoutToken(token);

    if (!isOnlineMethod(payment.method)) {
      return res.redirect(getFrontendBookingUrl({
        payment: 'failed',
        bookingId: payment.booking_id,
        reason: 'invalid_method',
      }));
    }

    const successUrl = `/api/payments/complete?token=${encodeURIComponent(token)}&result=success`;
    const failedUrl = `/api/payments/complete?token=${encodeURIComponent(token)}&result=failed`;
    const statusText = payment.status === 'SUCCESS'
      ? 'Giao dich nay da thanh toan thanh cong.'
      : payment.status === 'FAILED'
        ? 'Giao dich nay da that bai. Ban co the thu lai.'
        : 'Hoan tat giao dich de quay lai website.';

    return res.status(200).send(`<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thanh toan ${escapeHtml(payment.method)}</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; background: #f4f7fb; color: #17212b; }
      .wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
      .card { width: 100%; max-width: 560px; background: #fff; border-radius: 20px; padding: 32px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08); }
      .badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: #e0ebff; color: #1d4ed8; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
      h1 { margin: 16px 0 8px; font-size: 28px; }
      p { margin: 0 0 16px; line-height: 1.6; color: #475569; }
      dl { margin: 24px 0; }
      .row { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
      .row:last-child { border-bottom: none; }
      dt { color: #64748b; }
      dd { margin: 0; font-weight: 700; }
      .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
      .btn { flex: 1; min-width: 180px; text-align: center; padding: 14px 18px; border-radius: 12px; text-decoration: none; font-weight: 700; }
      .btn-primary { background: #2563eb; color: #fff; }
      .btn-secondary { background: #e2e8f0; color: #0f172a; }
      .note { margin-top: 16px; font-size: 14px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <span class="badge">${escapeHtml(payment.method)}</span>
        <h1>Thanh toan booking #BK-${escapeHtml(payment.booking_id)}</h1>
        <p>${escapeHtml(statusText)}</p>
        <dl>
          <div class="row">
            <dt>Tour</dt>
            <dd>${escapeHtml(payment.tour_title)}</dd>
          </div>
          <div class="row">
            <dt>Ma giao dich</dt>
            <dd>TXN-${escapeHtml(payment.id)}</dd>
          </div>
          <div class="row">
            <dt>So tien</dt>
            <dd>${Number(payment.amount || 0).toLocaleString('vi-VN')}d</dd>
          </div>
        </dl>
        <div class="actions">
          <a class="btn btn-primary" href="${successUrl}">Thanh toan thanh cong</a>
          <a class="btn btn-secondary" href="${failedUrl}">Thanh toan that bai</a>
        </div>
        <p class="note">Day la cong thanh toan mo phong de hoan thien luong redirect va thong bao tren website.</p>
      </div>
    </div>
  </body>
</html>`);
  } catch (error) {
    return res.status(400).send(error.message || 'Khong the mo trang thanh toan.');
  }
};

// GET /api/payments/complete?token=...&result=success|failed
// Hoan tat callback thanh toan va redirect ve frontend
exports.completePaymentCheckout = async (req, res) => {
  const { token, result } = req.query;

  if (!token || !result) {
    return res.redirect(getFrontendBookingUrl({
      payment: 'failed',
      reason: 'missing_params',
    }));
  }

  try {
    const payment = await getPaymentByCheckoutToken(token);
    const finalStatus = await updatePaymentResult(payment, result === 'success' ? 'success' : 'failed');

    return res.redirect(getFrontendBookingUrl({
      payment: finalStatus === 'SUCCESS' ? 'success' : 'failed',
      bookingId: payment.booking_id,
      paymentId: payment.id,
      method: payment.method,
    }));
  } catch (error) {
    return res.redirect(getFrontendBookingUrl({
      payment: 'failed',
      reason: 'invalid_token',
    }));
  }
};

// PUT /api/payments/:id/confirm
// Admin xac nhan da nhan tien cho giao dich cho xu ly
exports.confirmPayment = async (req, res) => {
  const paymentId = Number(req.params.id);

  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    return res.status(400).json({ message: 'Ma giao dich khong hop le.' });
  }

  try {
    const [rows] = await db.query(
      `SELECT p.id, p.booking_id, p.amount, p.method, p.status, b.status AS booking_status
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       WHERE p.id = ? LIMIT 1`,
      [paymentId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Khong tim thay giao dich.' });
    }

    const payment = rows[0];

    if (payment.status === 'SUCCESS') {
      return res.status(400).json({ message: 'Giao dich nay da duoc xac nhan truoc do.' });
    }

    if (payment.status !== 'PENDING') {
      return res.status(400).json({ message: 'Chi co the xac nhan giao dich dang cho xu ly.' });
    }

    if (payment.booking_status === 'CANCELLED') {
      return res.status(400).json({ message: 'Booking da bi huy, khong the xac nhan thanh toan.' });
    }

    const paidAt = new Date();

    await db.query(
      "UPDATE payments SET status = 'SUCCESS', paid_at = ? WHERE id = ?",
      [paidAt, paymentId],
    );

    await db.query(
      "UPDATE bookings SET status = 'CONFIRMED' WHERE id = ? AND status = 'PENDING'",
      [payment.booking_id],
    );

    return res.status(200).json({
      message: 'Xac nhan thanh toan thanh cong.',
      payment: {
        id: payment.id,
        booking_id: payment.booking_id,
        amount: payment.amount,
        method: payment.method,
        status: 'SUCCESS',
        paid_at: paidAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Khong the xac nhan giao dich luc nay.', error: error.message });
  }
};

// GET /api/payments/booking/:bookingId
// User/Admin xem lịch sử thanh toán của 1 booking
exports.getPaymentsByBookingId = async (req, res) => {
  const userId = req.user.id;
  const bookingId = Number(req.params.bookingId);

  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    return res.status(400).json({ message: 'Ma booking khong hop le.' });
  }

  try {
    // Xác nhận booking thuộc về user
    const [bookings] = await db.query(
      'SELECT id, total_price, status FROM bookings WHERE id = ? AND user_id = ? LIMIT 1',
      [bookingId, userId],
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Khong tim thay booking.' });
    }

    const [rows] = await db.query(
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY paid_at DESC',
      [bookingId],
    );

    return res.status(200).json({
      message: 'Lay lich su thanh toan thanh cong.',
      payments: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Khong the lay lich su thanh toan.', error: error.message });
  }
};

// GET /api/payments
// Admin xem danh sach tat ca giao dich
exports.getAllPayments = async (req, res) => {
  const { status, method } = req.query;

  try {
    const whereClauses = [];
    const params = [];

    if (status) {
      whereClauses.push('p.status = ?');
      params.push(String(status).toUpperCase());
    }

    if (method) {
      whereClauses.push('p.method = ?');
      params.push(String(method).toUpperCase());
    }

    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const [rows] = await db.query(
      `SELECT p.*,
              b.user_id, b.total_price, b.status AS booking_status,
              u.name AS user_name, u.email AS user_email,
              t.title AS tour_title
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN users u ON u.id = b.user_id
       JOIN tours t ON t.id = b.tour_id
       ${whereSql}
       ORDER BY (p.paid_at IS NULL) DESC, p.paid_at DESC, p.id DESC`,
      params,
    );

    return res.status(200).json({
      message: 'Lay danh sach giao dich thanh cong.',
      total: rows.length,
      payments: rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Khong the lay danh sach giao dich.',
      error: error.message,
    });
  }
};
