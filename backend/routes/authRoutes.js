const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Serve per le query SQL
const { register, login, refresh } = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Endpoint per i permessi (Corretto per MySQL)
router.get('/me/permissions', protect, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT permissions, role FROM users WHERE id = ? AND tenant_id = ?', 
      [req.user.id, req.user.tenant_id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Permessi (Solo Admin della propria azienda)
router.put('/admin/update-permissions/:id', protect, isAdmin, async (req, res) => {
  try {
    const { permissions } = req.body;
    await db.execute(
      'UPDATE users SET permissions = ? WHERE id = ? AND tenant_id = ?',
      [permissions, req.params.id, req.user.tenant_id]
    );
    res.json({ message: "Permessi aggiornati" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;