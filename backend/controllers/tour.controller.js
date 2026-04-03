// Quản lý Tour
const db = require('../config/db');

// Lấy tất cả tour (có lọc, tìm kiếm, phân trang)
exports.getAll = async (req, res) => {
  try {
    const { search, category_id, min_price, max_price, page = 1, limit = 9 } = req.query;
    let sql    = 'SELECT t.*, c.name AS category FROM tours t LEFT JOIN categories c ON t.category_id=c.id WHERE t.status="active"';
    const params = [];

    if (search)      { sql += ' AND (t.name LIKE ? OR t.location LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (category_id) { sql += ' AND t.category_id=?'; params.push(category_id); }
    if (min_price)   { sql += ' AND t.price>=?'; params.push(min_price); }
    if (max_price)   { sql += ' AND t.price<=?'; params.push(max_price); }

    const offset = (page - 1) * limit;
    sql += ` ORDER BY t.created_at DESC LIMIT ${+limit} OFFSET ${offset}`;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Chi tiết tour
exports.getById = async (req, res) => {
  const [rows] = await db.query(
    'SELECT t.*, c.name AS category FROM tours t LEFT JOIN categories c ON t.category_id=c.id WHERE t.id=?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Tour không tồn tại' });
  res.json(rows[0]);
};

// Tạo tour (Admin)
exports.create = async (req, res) => {
  try {
    const { name, description, price, duration, location, category_id, max_people, start_date, end_date } = req.body;
    const image = req.file ? req.file.filename : null;
    const [r] = await db.query(
      'INSERT INTO tours (name,description,price,duration,location,category_id,max_people,start_date,end_date,image) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [name, description, price, duration, location, category_id, max_people, start_date, end_date, image]
    );
    res.status(201).json({ message: 'Tạo tour thành công', id: r.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Cập nhật tour (Admin)
exports.update = async (req, res) => {
  try {
    const fields = req.body;
    if (req.file) fields.image = req.file.filename;
    const sets   = Object.keys(fields).map(k => `${k}=?`).join(',');
    await db.query(`UPDATE tours SET ${sets} WHERE id=?`, [...Object.values(fields), req.params.id]);
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Xóa tour (Admin)
exports.remove = async (req, res) => {
  await db.query('UPDATE tours SET status="inactive" WHERE id=?', [req.params.id]);
  res.json({ message: 'Đã xóa tour' });
};
