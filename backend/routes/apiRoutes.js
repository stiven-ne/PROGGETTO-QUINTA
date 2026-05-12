const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { verifyTenant } = require('../middleware/tenant'); // AGGIUNTO
const dataCtrl = require('../controllers/dataController');

// Applichiamo i controlli a tutte le rotte sotto
router.use(protect);
router.use(verifyTenant);

router.get('/dashboard', dataCtrl.getDashboardData);
router.get('/transactions', dataCtrl.getAllTransactions);
router.get('/budgets', dataCtrl.getBudgets);
router.get('/reminders', dataCtrl.getReminders);
router.get('/admin/users', dataCtrl.getUsersAdmin);

module.exports = router;