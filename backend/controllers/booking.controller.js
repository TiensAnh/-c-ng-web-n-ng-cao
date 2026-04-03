// Quản lý đặt tour
const db = require('../config/db');

// Tạo đơn đặt tour
exports.create = async (req, res) => {
  try {
    const { tour_id, num_people, contact_name, contact_phone, contact_email, note } = req.body;
    const user_id = req.user.id;

    const [tour] = await db.query('SELECT * FROM tours WHERE id=?', [tour_id]);
    if (!tour.length) return res.status(404).json({ message: 'Tour không tồn tại' });

    const total = tour[0].price * num_people;
    const [r] = await db.query(
      'INSERT INTO bookings (user_id,tour_id,num_people,total_price,contact_name,contact_phone,contact_email,note) VALUES (?,?,?,?,?,?,?,?)',
      [user_id, tour_id, num_people, total, contact_name, contact_phone, contact_email, note]
    );
    res.status(201).json({ message: 'Đặt tour thành công', booking_id: r.insertId, total });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Lịch sử đặt tour của user
exports.getMyBookings = async (req, res) => {
  const [rows] = await db.query(
    'SELECT b.*,t.name AS tour_name,t.image FROM bookings b JOIN tours t ON b.tour_id=t.id WHERE b.user_id=? ORDER BY b.created_at DESC',
    [req.user.id]
  );
  res.json(rows);
};

// Hủy đơn (user — trong vòng 24h)
exports.cancel = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'Đơn không tồn tại' });

    const booking = rows[0];
    if (booking.status !== 'pending') return res.status(400).json({ message: 'Không thể hủy đơn này' });

    const created = new Date(booking.created_at);
    const diff    = (Date.now() - created.getTime()) / 1000 / 3600;
    if (diff > 24) return res.status(400).json({ message: 'Đã quá 24h, không thể hủy' });

    await db.query('UPDATE bookings SET status="cancelled" WHERE id=?', [req.params.id]);
    res.json({ message: 'Hủy tour thành công' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Danh sách tất cả đơn (Admin)
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    'SELECT b.*,u.name AS user_name,t.name AS tour_name FROM bookings b JOIN users u ON b.user_id=u.id JOIN tours t ON b.tour_id=t.id ORDER BY b.created_at DESC'
  );
  res.json(rows);
};

// Cập nhật trạng thái đơn (Admin)
exports.updateStatus = async (req, res) => {
  await db.query('UPDATE bookings SET status=? WHERE id=?', [req.body.status, req.params.id]);
  res.json({ message: 'Cập nhật trạng thái thành công' });
};
