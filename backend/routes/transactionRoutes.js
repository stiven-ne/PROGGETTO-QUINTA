const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { verifyTenant } = require('../middleware/tenant');
const { 
  addTransaction, 
  getTransactions, 
  updateTransaction, 
  deleteTransaction 
} = require('../controllers/transactionController');

// Tutte le rotte richiedono login e identificazione azienda
router.use(protect);
router.use(verifyTenant);

router.post('/', addTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;