const router = require('express').Router();
const ctrl   = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.get ('/',          verifyToken, isAdmin, ctrl.getAll);
router.put ('/:id/toggle',verifyToken, isAdmin, ctrl.toggleStatus);

module.exports = router;
