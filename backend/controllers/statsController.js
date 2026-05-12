const db = require('../config/db');

exports.getMonthlyComparison = async (req, res) => {
  try {
    const { month1, year1, month2, year2 } = req.query;
    const userId = req.user.id;
    const tenantId = req.user.tenant_id; // Fondamentale per il Multi-Tenancy

    if (!tenantId) {
      return res.status(403).json({ error: "Tenant non identificato" });
    }

    // Funzione interna per ottenere i dati dal database MySQL
    const getStats = async (m, y) => {
      // Query SQL: Sommiamo le entrate e sottraiamo le uscite direttamente nel DB
      // Filtriamo SEMPRE per user_id E tenant_id
      const [rows] = await db.execute(
        `SELECT 
            SUM(CASE WHEN type = 'entrata' THEN amount ELSE -amount END) as total,
            COUNT(*) as count 
         FROM transactions 
         WHERE user_id = ? AND tenant_id = ? AND MONTH(date) = ? AND YEAR(date) = ?`,
        [userId, tenantId, m, y]
      );

      return {
        total: parseFloat(rows[0].total || 0),
        count: rows[0].count || 0
      };
    };

    // Eseguiamo i calcoli per i due periodi richiesti
    const stats1 = await getStats(month1, year1);
    const stats2 = await getStats(month2, year2);

    res.json({
      period1: stats1,
      period2: stats2,
      diff: (stats1.total - stats2.total).toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};