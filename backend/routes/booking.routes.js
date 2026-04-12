const router = require('express').Router();
const ctrl   = require('../controllers/booking.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// ========== USER ROUTES ==========
router.post ('/',                   verifyToken, ctrl.create);           // Đặt tour
router.get  ('/my',                 verifyToken, ctrl.getMyBookings);     // Lịch sử booking
router.get  ('/:id',                verifyToken, ctrl.getById);           // Chi tiết booking
router.put  ('/:id/cancel',         verifyToken, ctrl.cancel);           // Hủy booking

// ========== ADMIN ROUTES ==========
router.get  ('/all/list',           verifyToken, isAdmin, ctrl.getAll);  // Danh sách tất cả (phải đặt trước /:id)
router.get  ('/admin/stats',        verifyToken, isAdmin, ctrl.getStats); // Thống kê
router.put  ('/:id/status',         verifyToken, isAdmin, ctrl.updateStatus); // Cập nhật trạng thái

module.exports = router;
