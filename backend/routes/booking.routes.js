const router = require('express').Router();
const ctrl   = require('../controllers/booking.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post ('/',               verifyToken, ctrl.create);
router.get  ('/my',             verifyToken, ctrl.getMyBookings);
router.put  ('/:id/cancel',     verifyToken, ctrl.cancel);
router.get  ('/all',            verifyToken, isAdmin, ctrl.getAll);
router.put  ('/:id/status',     verifyToken, isAdmin, ctrl.updateStatus);

module.exports = router;
