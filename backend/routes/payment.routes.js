const router = require('express').Router();
const ctrl   = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/',         verifyToken, ctrl.create);
router.post('/callback', ctrl.callback);
router.get ('/my',       verifyToken, ctrl.getMyPayments);

module.exports = router;
