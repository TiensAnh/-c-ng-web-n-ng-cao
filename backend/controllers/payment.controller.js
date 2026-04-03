// Quản lý thanh toán
const db = require('../config/db');

// Tạo thanh toán
exports.create = async (req, res) => {
  try {
    const { booking_id, method } = req.body;
    const [bk] = await db.query('SELECT * FROM bookings WHERE id=? AND user_id=?', [booking_id, req.user.id]);
    if (!bk.length) return res.status(404).json({ message: 'Đơn không tồn tại' });

    const [r] = await db.query(
      'INSERT INTO payments (booking_id,user_id,amount,method,status) VALUES (?,?,?,?,?)',
      [booking_id, req.user.id, bk[0].total_price, method, 'pending']
    );

    // TODO: Tích hợp cổng thanh toán (VNPay / Momo)
    res.status(201).json({ message: 'Khởi tạo thanh toán thành công', payment_id: r.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Callback từ cổng thanh toán
exports.callback = async (req, res) => {
  const { payment_id, status } = req.body;
  await db.query('UPDATE payments SET status=? WHERE id=?', [status, payment_id]);
  if (status === 'success') {
    await db.query('UPDATE bookings SET status="confirmed" WHERE id=(SELECT booking_id FROM payments WHERE id=?)', [payment_id]);
  }
  res.json({ message: 'Cập nhật thanh toán thành công' });
};

// Lịch sử thanh toán của user
exports.getMyPayments = async (req, res) => {
  const [rows] = await db.query(
    'SELECT p.*,t.name AS tour_name FROM payments p JOIN bookings b ON p.booking_id=b.id JOIN tours t ON b.tour_id=t.id WHERE p.user_id=?',
    [req.user.id]
  );
  res.json(rows);
};
