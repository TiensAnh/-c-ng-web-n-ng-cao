// Khởi tạo Express app
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const session    = require('express-session');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'travel_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}));

// Routes
app.use('/api/auth',       require('../routes/auth.routes'));
app.use('/api/tours',      require('../routes/tour.routes'));
app.use('/api/categories', require('../routes/category.routes'));
app.use('/api/bookings',   require('../routes/booking.routes'));
app.use('/api/payments',   require('../routes/payment.routes'));
app.use('/api/users',      require('../routes/user.routes'));
app.use('/api/admin',      require('../routes/admin.routes'));
app.use('/api/chatbot',    require('../routes/chatbot.routes'));
app.use('/api/stats',      require('../routes/stats.routes'));

module.exports = app;
