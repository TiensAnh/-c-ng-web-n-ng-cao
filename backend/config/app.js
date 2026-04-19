const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();

const adminAuthRoutes = require('../routes/adminAuth.routes');
const authRoutes = require('../routes/auth.routes');

const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin-auth', adminAuthRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: 'Internal server error',
  });
});

module.exports = app;
