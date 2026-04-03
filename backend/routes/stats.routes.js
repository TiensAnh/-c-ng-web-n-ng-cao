const router = require('express').Router();
const ctrl   = require('../controllers/stats.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.get('/dashboard', verifyToken, isAdmin, ctrl.getDashboard);

module.exports = router;
