// Thống kê báo cáo (Admin)
const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    const [[{ total_users }]]    = await db.query('SELECT COUNT(*) AS total_users FROM users WHERE role="user"');
    const [[{ total_tours }]]    = await db.query('SELECT COUNT(*) AS total_tours FROM tours WHERE status="active"');
    const [[{ total_bookings }]] = await db.query('SELECT COUNT(*) AS total_bookings FROM bookings');
    const [[{ total_revenue }]]  = await db.query('SELECT COALESCE(SUM(amount),0) AS total_revenue FROM payments WHERE status="success"');
    const [monthly]              = await db.query(
      'SELECT MONTH(created_at) AS month, SUM(amount) AS revenue FROM payments WHERE YEAR(created_at)=YEAR(NOW()) AND status="success" GROUP BY month'
    );
    const [top_tours] = await db.query(
      'SELECT t.name, COUNT(b.id) AS bookings FROM bookings b JOIN tours t ON b.tour_id=t.id GROUP BY b.tour_id ORDER BY bookings DESC LIMIT 5'
    );
    res.json({ total_users, total_tours, total_bookings, total_revenue, monthly, top_tours });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
