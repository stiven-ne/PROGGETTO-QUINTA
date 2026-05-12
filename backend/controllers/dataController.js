const db = require('../config/db');

// VISTA 1: DASHBOARD (Riepilogo Totale dell'utente nell'azienda)
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const tenantId = req.user.tenant_id;

        // Somma entrate/uscite solo per questa azienda e questo utente
        const [transactions] = await db.execute(
            'SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ? AND tenant_id = ? GROUP BY type', 
            [userId, tenantId]
        );

        // Promemoria non pagati solo di questa azienda e utente
        const [reminders] = await db.execute(
            'SELECT * FROM reminders WHERE user_id = ? AND tenant_id = ? AND is_paid = FALSE ORDER BY due_date ASC LIMIT 5', 
            [userId, tenantId]
        );

        res.json({ stats: transactions, recentReminders: reminders });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

// VISTA 2: TRANSAZIONI (Lista Completa filtrata per azienda)
exports.getAllTransactions = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM transactions WHERE user_id = ? AND tenant_id = ? ORDER BY date DESC', 
            [req.user.id, req.user.tenant_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// VISTA 3: BUDGET (Controllo Spese filtrato per azienda)
exports.getBudgets = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM budgets WHERE user_id = ? AND tenant_id = ?', 
            [req.user.id, req.user.tenant_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// VISTA 4: PROMEMORIA (Calendario filtrato per azienda)
exports.getReminders = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM reminders WHERE user_id = ? AND tenant_id = ?', 
            [req.user.id, req.user.tenant_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// VISTA 5: ADMIN / PROFILO (Vedi solo gli utenti della TUA azienda)
exports.getUsersAdmin = async (req, res) => {
    try {
        // Controllo ruolo
        if (req.user.role !== 'admin') return res.status(403).send("Vietato: non sei admin");

        const tenantId = req.user.tenant_id;

        // IMPORTANTE: Qui l'admin vede solo gli utenti che hanno lo stesso suo tenant_id
        const [rows] = await db.execute(
            'SELECT id, email, role, permissions FROM users WHERE tenant_id = ?', 
            [tenantId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};