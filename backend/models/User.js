/**
 * Modello USER (Riferimento per MySQL)
 * Tabella: users
 */
const User = {
  id: "INT AUTO_INCREMENT PRIMARY KEY",
  tenant_id: "INT (Chiave Esterna verso tenants.id)",
  email: "VARCHAR(255) UNIQUE",
  password: "VARCHAR(255)",
  role: "ENUM('user', 'admin') DEFAULT 'user'",
  permissions: "TEXT (Memorizzato come stringa JSON)",
  refresh_token: "TEXT"
};

module.exports = User;