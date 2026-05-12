const db = require('../config/db');

exports.addTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  
  // ESTRAIAMO SIA L'ID UTENTE CHE L'ID AZIENDA (Tenant) dal Token JWT
  const userId = req.user.id; 
  const tenantId = req.user.tenant_id; 

  // Se per qualche motivo il tenant_id manca nel token, blocchiamo tutto per sicurezza
  if (!tenantId) {
    return res.status(403).json({ error: "Accesso negato: Tenant non identificato nel token" });
  }

  try {
    // AGGIUNTA: Inseriamo il tenant_id nella colonna che abbiamo creato su phpMyAdmin
    await db.execute(
      'INSERT INTO transactions (tenant_id, user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tenantId, userId, type, amount, category, description, date || new Date()]
    );
    
    res.status(201).json({ message: "Transazione registrata correttamente per la tua azienda" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const tenantId = req.user.tenant_id;

  if (!tenantId) {
    return res.status(403).json({ error: "Accesso negato: Tenant non identificato" });
  }

  try {
    // FONDAMENTALE: Filtriamo per tenant_id così l'utente vede SOLO i dati della sua azienda
    const [rows] = await db.execute(
      'SELECT * FROM transactions WHERE tenant_id = ? AND user_id = ? ORDER BY date DESC', 
      [tenantId, req.user.id]
    );
    
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};