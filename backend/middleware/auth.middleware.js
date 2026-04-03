// Xác thực JWT
const jwtUtil = require('../config/jwt');

exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Không có token' });

  const token = header.split(' ')[1];
  try {
    req.user = jwtUtil.verify(token);
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ message: 'Chỉ admin mới được truy cập' });
  next();
};
