// Cấu hình JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'jwt_travel_secret';

module.exports = {
  sign:   (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' }),
  verify: (token)   => jwt.verify(token, SECRET),
};
