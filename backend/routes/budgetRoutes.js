const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { verifyTenant } = require('../middleware/tenant');
const { checkBudgetStatus } = require('../controllers/budgetController');

router.get('/status', protect, verifyTenant, checkBudgetStatus);

module.exports = router;