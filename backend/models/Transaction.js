/**
 * Modello TRANSACTION (Riferimento per MySQL)
 * Tabella: transactions
 */
const Transaction = {
  id: "INT AUTO_INCREMENT PRIMARY KEY",
  tenant_id: "INT (Isolamento Aziendale)",
  user_id: "INT (Proprietario della transazione)",
  type: "ENUM('entrata', 'uscita')",
  amount: "DECIMAL(10,2)",
  category: "VARCHAR(100)",
  description: "TEXT",
  date: "DATETIME (Default CURRENT_TIMESTAMP)"
};

module.exports = Transaction;