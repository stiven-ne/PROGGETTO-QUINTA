/**
 * Modello BUDGET (Riferimento per MySQL)
 * Tabella: budgets
 */
const Budget = {
  id: "INT AUTO_INCREMENT PRIMARY KEY",
  tenant_id: "INT (Isolamento Aziendale)",
  user_id: "INT (Proprietario del budget)",
  category: "VARCHAR(100)",
  limit_amount: "DECIMAL(10,2)",
  month: "INT (1-12)",
  year: "INT"
};

module.exports = Budget;