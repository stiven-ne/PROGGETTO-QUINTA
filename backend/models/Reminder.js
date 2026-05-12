/**
 * Modello REMINDER (Riferimento per MySQL)
 * Tabella: reminders
 */
const Reminder = {
  id: "INT AUTO_INCREMENT PRIMARY KEY",
  tenant_id: "INT (Isolamento Aziendale)",
  user_id: "INT (Proprietario del promemoria)",
  title: "VARCHAR(255)",
  amount: "DECIMAL(10,2)",
  due_date: "DATE",
  is_paid: "BOOLEAN (Default FALSE)"
};

module.exports = Reminder;