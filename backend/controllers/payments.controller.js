const db = require('../config/db');

const ALLOWED_METHODS = ['CASH', 'BANK_TRANSFER', 'MOMO', 'VNPAY'];

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
    return 'Da tao yeu cau thanh toan. Hien he thong dang cho admin xac nhan giao dich.';
  }

  return 'Da tao yeu cau thanh toan thanh cong.';
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

    return res.status(201).json({
      message: buildPendingPaymentMessage(normalizedMethod),
      payment: {
        id: result.insertId,
        booking_id: Number(booking_id),
        amount: booking.total_price,
        method: normalizedMethod,
        status: 'PENDING',
        paid_at: null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Khong the xu ly thanh toan luc nay.', error: error.message });
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
