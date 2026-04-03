const router = require('express').Router();
const ctrl   = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.get   ('/',    ctrl.getAll);
router.post  ('/',    verifyToken, isAdmin, ctrl.create);
router.put   ('/:id', verifyToken, isAdmin, ctrl.update);
router.delete('/:id', verifyToken, isAdmin, ctrl.remove);

module.exports = router;
