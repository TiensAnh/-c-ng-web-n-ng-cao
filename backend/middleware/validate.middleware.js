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

// Validate booking
exports.validateBooking = (req, res, next) => {
  const { tour_id, num_people, contact_name, contact_phone, contact_email } = req.body;
  
  if (!tour_id || !num_people || !contact_name || !contact_phone || !contact_email) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }
  
  if (!Number.isInteger(num_people) || num_people < 1 || num_people > 100) {
    return res.status(400).json({ message: 'Số lượng khách không hợp lệ (1-100)' });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
    return res.status(400).json({ message: 'Email liên hệ không hợp lệ' });
  }
  
  if (!/^[\d\s\-\+]+$/.test(contact_phone) || contact_phone.length < 9) {
    return res.status(400).json({ message: 'Số điện thoại không hợp lệ' });
  }
  
  next();
};
