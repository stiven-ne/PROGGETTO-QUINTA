const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Ora prendiamo anche il tenant_id dalla tabella users
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      
      // MODIFICA FONDAMENTALE: Inseriamo tenant_id nel Token di Accesso
      // In questo modo il middleware e i controller avranno req.user.tenant_id disponibile
      const accessToken = jwt.sign(
        { 
          id: user.id, 
          tenant_id: user.tenant_id, // <--- ECCOLO!
          role: user.role 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '10m' }
      );

      // Anche nel Refresh Token è bene includere il tenant_id per sicurezza
      const refreshToken = jwt.sign(
        { id: user.id, tenant_id: user.tenant_id }, 
        process.env.REFRESH_SECRET, 
        { expiresIn: '7d' }
      );

      // Salviamo il Refresh Token nel DB
      await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);

      // Restituiamo anche il tenant_id al frontend (potrebbe servire per loghi o nomi azienda)
      res.json({ 
        accessToken, 
        refreshToken, 
        role: user.role,
        tenant_id: user.tenant_id 
      });

    } else {
      res.status(401).json({ message: "Credenziali errate" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};