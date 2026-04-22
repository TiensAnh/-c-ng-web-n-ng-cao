const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const adminAuthRoutes = require('../routes/adminAuth.routes');
const authRoutes = require('../routes/auth.routes');
const toursRoutes = require('../routes/tours.routes');

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
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/tours', toursRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Anh vuot qua gioi han 5MB.',
      });
    }

    return res.status(400).json({
      message: error.message || 'Upload file khong hop le.',
    });
  }

  if (error?.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message || 'Yeu cau khong hop le.',
    });
  }

  console.error(error);

  res.status(500).json({
    message: 'Internal server error',
  });
});

module.exports = app;
