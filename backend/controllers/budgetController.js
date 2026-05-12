const db = require('../config/db');

exports.checkBudgetStatus = async (req, res) => {
  try {
    const { category, month, year } = req.query;
    
    // ESTRAIAMO GLI ID DAL TOKEN
    const userId = req.user.id;
    const tenantId = req.user.tenant_id;

    if (!tenantId) {
        return res.status(403).json({ error: "Tenant non identificato" });
    }

    // 1. CERCHIAMO IL BUDGET (Filtrato per Utente E Azienda)
    const [budgetRows] = await db.execute(
      'SELECT limit_amount FROM budgets WHERE user_id = ? AND tenant_id = ? AND category = ? AND month = ? AND year = ?',
      [userId, tenantId, category, month, year]
    );

    const budget = budgetRows[0];
    if (!budget) return res.json({ msg: "Nessun budget impostato per questa categoria" });

    // 2. CALCOLIAMO LE SPESE (Solo di questo utente e di questa azienda)
    // Usiamo SQL per sommare direttamente, è molto più veloce del .reduce in JS
    const [expenseRows] = await db.execute(
      `SELECT SUM(amount) as totalSpent FROM transactions 
       WHERE user_id = ? AND tenant_id = ? 
       AND category = ? AND type = 'uscita' 
       AND MONTH(date) = ? AND YEAR(date) = ?`,
      [userId, tenantId, category, month, year]
    );

    const totalSpent = expenseRows[0].totalSpent || 0;
    const limitAmount = budget.limit_amount;
    const percentage = (totalSpent / limitAmount) * 100;

    // 3. LOGICA DI AVVISO
    let alert = null;
    if (percentage >= 100) {
        alert = "ATTENZIONE: Budget Superato!";
    } else if (percentage >= 75) {
        alert = "AVVISO: Hai superato il 75% del budget";
    }

    res.json({ 
        totalSpent, 
        limit: limitAmount, 
        percentage: percentage.toFixed(2), 
        alert 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};