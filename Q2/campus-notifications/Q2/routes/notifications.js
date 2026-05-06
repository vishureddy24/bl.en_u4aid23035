const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/notificationController');

router.get('/', auth, controller.getNotifications);
router.patch('/:id/read', auth, controller.markAsRead);
router.post('/notify-all', auth, controller.notifyAll);

module.exports = router;
