const router = require('express').Router();
const ctrl   = require('../controllers/chatbot.controller');

router.post('/message', ctrl.chat);

module.exports = router;
