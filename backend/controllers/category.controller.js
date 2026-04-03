// Quản lý danh mục
const db = require('../config/db');

exports.getAll    = async (req, res) => {
  const [r] = await db.query('SELECT * FROM categories');
  res.json(r);
};
exports.create    = async (req, res) => {
  const [r] = await db.query('INSERT INTO categories (name,description) VALUES (?,?)', [req.body.name, req.body.description]);
  res.status(201).json({ id: r.insertId, message: 'Tạo danh mục thành công' });
};
exports.update    = async (req, res) => {
  await db.query('UPDATE categories SET name=?,description=? WHERE id=?', [req.body.name, req.body.description, req.params.id]);
  res.json({ message: 'Cập nhật thành công' });
};
exports.remove    = async (req, res) => {
  await db.query('DELETE FROM categories WHERE id=?', [req.params.id]);
  res.json({ message: 'Xóa thành công' });
};
