const router   = require('express').Router();
const ctrl     = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middleware/validate.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', validateRegister, ctrl.register);
router.post('/login',    validateLogin,    ctrl.login);
router.post('/logout',   verifyToken,      ctrl.logout);
router.get ('/me',       verifyToken,      ctrl.getMe);

module.exports = router;
