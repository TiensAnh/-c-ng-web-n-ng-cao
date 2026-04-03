// Xác thực người dùng
const bcrypt  = require('bcryptjs');
const db      = require('../config/db');
const jwtUtil = require('../config/jwt');

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const [exist] = await db.query('SELECT id FROM users WHERE email=?', [email]);
    if (exist.length) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?,?,?,?)',
      [name, email, hash, phone]
    );
    res.status(201).json({ message: 'Đăng ký thành công', id: result.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Email không tồn tại' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mật khẩu không đúng' });

    const token = jwtUtil.sign({ id: user.id, role: user.role });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Đăng xuất
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Đăng xuất thành công' });
};

// Lấy thông tin user đang đăng nhập
exports.getMe = async (req, res) => {
  const [rows] = await db.query('SELECT id,name,email,phone,avatar,role FROM users WHERE id=?', [req.user.id]);
  res.json(rows[0]);
};
