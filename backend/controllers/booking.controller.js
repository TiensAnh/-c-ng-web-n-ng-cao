// Quản lý đặt tour
const db = require('../config/db');

// ============ USER BOOKINGS ============

// Tạo đơn đặt tour
exports.create = async (req, res) => {
  try {
    const { tour_id, num_people, contact_name, contact_phone, contact_email, note } = req.body;
    const user_id = req.user.id;

    // Validate input
    if (!tour_id || !num_people || !contact_name || !contact_phone || !contact_email) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    if (num_people < 1 || num_people > 100) {
      return res.status(400).json({ message: 'Số lượng khách không hợp lệ (1-100)' });
    }

    // Kiểm tra tour tồn tại
    const [tours] = await db.query('SELECT * FROM tours WHERE id=?', [tour_id]);
    if (!tours.length) return res.status(404).json({ message: 'Tour không tồn tại' });

    const tour = tours[0];
    if (tour.status !== 'active') {
      return res.status(400).json({ message: 'Tour này không còn hoạt động' });
    }

    // Kiểm tra slot có đủ không
    const [bookings] = await db.query(
      'SELECT SUM(num_people) as booked FROM bookings WHERE tour_id=? AND status IN ("pending","confirmed")',
      [tour_id]
    );
    const booked = bookings[0].booked || 0;
    const available = tour.max_people - booked;

    if (num_people > available) {
      return res.status(400).json({ 
        message: `Không đủ chỗ. Còn lại: ${available} chỗ`, 
        available 
      });
    }

    // Tạo booking
    const total = parseFloat(tour.price) * num_people;
    const [result] = await db.query(
      'INSERT INTO bookings (user_id,tour_id,num_people,total_price,contact_name,contact_phone,contact_email,note) VALUES (?,?,?,?,?,?,?,?)',
      [user_id, tour_id, num_people, total, contact_name, contact_phone, contact_email, note || '']
    );

    res.status(201).json({
      message: 'Đặt tour thành công',
      booking_id: result.insertId,
      total: total,
      tour_name: tour.name,
      num_people: num_people
    });
  } catch (err) {
    console.error('Booking create error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lịch sử đặt tour của user
exports.getMyBookings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, t.name AS tour_name, t.image, t.location, t.duration, t.start_date
       FROM bookings b 
       JOIN tours t ON b.tour_id=t.id 
       WHERE b.user_id=? 
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Chi tiết đơn booking
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, t.name AS tour_name, t.image, t.location, t.duration, t.description
       FROM bookings b 
       JOIN tours t ON b.tour_id=t.id 
       WHERE b.id=? AND b.user_id=?`,
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Đơn không tồn tại' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hủy đơn (user — trong vòng 24h)
exports.cancel = async (req, res) => {
  try {
    const { cancel_reason } = req.body;
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE id=? AND user_id=?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Đơn không tồn tại' });

    const booking = rows[0];
    
    // Chỉ có thể hủy pending hoặc confirmed
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: 'Không thể hủy đơn này' });
    }

    // Kiểm tra thời gian (24h)
    const created = new Date(booking.created_at);
    const diff = (Date.now() - created.getTime()) / 1000 / 3600;
    if (diff > 24) {
      return res.status(400).json({ message: 'Đã quá 24h, không thể hủy' });
    }

    // Cập nhật trạng thái
    await db.query(
      'UPDATE bookings SET status=? WHERE id=?',
      ['cancelled', req.params.id]
    );

    res.json({
      message: 'Hủy tour thành công',
      booking_id: req.params.id,
      refund_amount: booking.total_price
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============ ADMIN BOOKINGS ============

// Danh sách tất cả đơn (Admin)
exports.getAll = async (req, res) => {
  try {
    const { status, search, sort } = req.query;
    let query = `SELECT b.*, u.name AS user_name, u.phone AS user_phone, t.name AS tour_name 
                 FROM bookings b 
                 JOIN users u ON b.user_id=u.id 
                 JOIN tours t ON b.tour_id=t.id WHERE 1=1`;
    const params = [];

    // Filter by status
    if (status && ['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      query += ' AND b.status=?';
      params.push(status);
    }

    // Search by booking ID, phone, or name
    if (search) {
      query += ' AND (b.id LIKE ? OR b.contact_phone LIKE ? OR b.contact_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Sort
    query += sort === 'oldest' ? ' ORDER BY b.created_at ASC' : ' ORDER BY b.created_at DESC';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật trạng thái đơn (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
    }

    const [rows] = await db.query('SELECT * FROM bookings WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Đơn không tồn tại' });

    await db.query('UPDATE bookings SET status=? WHERE id=?', [status, req.params.id]);

    res.json({
      message: 'Cập nhật trạng thái thành công',
      booking_id: req.params.id,
      new_status: status
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thống kê bookings (Admin)
exports.getStats = async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status='confirmed' THEN 1 ELSE 0 END) as confirmed_count,
        SUM(CASE WHEN status='cancelled' THEN 1 ELSE 0 END) as cancelled_count,
        SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_count,
        SUM(total_price) as total_revenue
      FROM bookings
    `);
    res.json(stats[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
