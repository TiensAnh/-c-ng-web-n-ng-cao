const router  = require('express').Router();
const ctrl    = require('../controllers/tour.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload  = require('../middleware/upload.middleware');

router.get  ('/',    ctrl.getAll);
router.get  ('/:id', ctrl.getById);
router.post ('/',    verifyToken, isAdmin, upload.single('image'), ctrl.create);
router.put  ('/:id', verifyToken, isAdmin, upload.single('image'), ctrl.update);
router.delete('/:id',verifyToken, isAdmin, ctrl.remove);

module.exports = router;
