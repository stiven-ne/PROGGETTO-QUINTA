const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { verifyTenant } = require('../middleware/tenant');
const { addReminder, getReminders } = require('../controllers/reminderController');

router.post('/', protect, verifyTenant, addReminder);
router.get('/', protect, verifyTenant, getReminders);

module.exports = router;