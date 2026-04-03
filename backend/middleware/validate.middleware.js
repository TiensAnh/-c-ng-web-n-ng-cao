// Validate input đơn giản
exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ message: 'Email không hợp lệ' });
  if (password.length < 6)
    return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
  next();
};
