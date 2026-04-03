// Quản lý người dùng
const bcrypt = require('bcryptjs');
const db     = require('../config/db');

// Xem profile
exports.getProfile = async (req, res) => {
  const [r] = await db.query('SELECT id,name,email,phone,avatar,role,created_at FROM users WHERE id=?', [req.user.id]);
  res.json(r[0]);
};

// Cập nhật profile
exports.updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  const avatar = req.file ? req.file.filename : undefined;
  const fields = { name, phone };
  if (avatar) fields.avatar = avatar;
  const sets = Object.keys(fields).map(k => `${k}=?`).join(',');
  await db.query(`UPDATE users SET ${sets} WHERE id=?`, [...Object.values(fields), req.user.id]);
  res.json({ message: 'Cập nhật thành công' });
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  const [rows] = await db.query('SELECT password FROM users WHERE id=?', [req.user.id]);
  const match  = await bcrypt.compare(old_password, rows[0].password);
  if (!match) return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
  const hash = await bcrypt.hash(new_password, 10);
  await db.query('UPDATE users SET password=? WHERE id=?', [hash, req.user.id]);
  res.json({ message: 'Đổi mật khẩu thành công' });
};

// Admin: Danh sách user
exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT id,name,email,phone,role,created_at FROM users ORDER BY created_at DESC');
  res.json(rows);
};

// Admin: Khóa / mở user
exports.toggleStatus = async (req, res) => {
  await db.query('UPDATE users SET status=IF(status="active","locked","active") WHERE id=?', [req.params.id]);
  res.json({ message: 'Cập nhật trạng thái thành công' });
};
