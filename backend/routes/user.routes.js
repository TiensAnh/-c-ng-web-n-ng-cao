const router  = require('express').Router();
const ctrl    = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload  = require('../middleware/upload.middleware');

router.get ('/profile',          verifyToken, ctrl.getProfile);
router.put ('/profile',          verifyToken, upload.single('avatar'), ctrl.updateProfile);
router.put ('/change-password',  verifyToken, ctrl.changePassword);

module.exports = router;
