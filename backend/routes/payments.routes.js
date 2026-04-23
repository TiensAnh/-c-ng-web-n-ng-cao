const express = require('express');

const {
  completePaymentCheckout,
  confirmPayment,
  createPayment,
  getAllPayments,
  getPaymentsByBookingId,
  renderPaymentCheckout,
} = require('../controllers/payments.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authenticateAdminToken } = require('../middleware/adminAuth.middleware');

const router = express.Router();

router.get('/checkout', renderPaymentCheckout);
router.get('/complete', completePaymentCheckout);
router.get('/', authenticateAdminToken, getAllPayments);
router.put('/:id/confirm', authenticateAdminToken, confirmPayment);
router.post('/', authenticateToken, createPayment);
router.get('/booking/:bookingId', authenticateToken, getPaymentsByBookingId);

module.exports = router;
