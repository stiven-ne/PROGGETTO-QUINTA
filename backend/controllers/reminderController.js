const db = require('../config/db');

// AGGIUNGI PROMEMORIA
exports.addReminder = async (req, res) => {
  try {
    const { title, amount, dueDate } = req.body;
    
    // Prendiamo ID utente e ID azienda dal Token JWT
    const userId = req.user.id;
    const tenantId = req.user.tenant_id;

    if (!tenantId) {
      return res.status(403).json({ error: "Tenant non identificato nel token" });
    }

    // Usiamo la query SQL per MySQL
    await db.execute(
      'INSERT INTO reminders (tenant_id, user_id, title, amount, due_date) VALUES (?, ?, ?, ?, ?)',
      [tenantId, userId, title, amount, dueDate]
    );

    res.status(201).json({ message: "Promemoria salvato correttamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// OTTIENI TUTTI I PROMEMORIA (Filtrati per azienda e utente)
exports.getReminders = async (req, res) => {
  try {
    const userId = req.user.id;
    const tenantId = req.user.tenant_id;

    if (!tenantId) {
      return res.status(403).json({ error: "Tenant non identificato" });
    }

    // Selezioniamo solo i promemoria che appartengono sia all'utente che all'azienda
    const [rows] = await db.execute(
      'SELECT * FROM reminders WHERE tenant_id = ? AND user_id = ? ORDER BY due_date ASC',
      [tenantId, userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};