const mysql = require('mysql2');
require('dotenv').config();

// Creiamo un "Pool" di connessioni. 
// È meglio di una connessione singola perché gestisce più utenti contemporaneamente.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'silver_palm_tree',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Esportiamo il pool usando le Promises.
// Questo ti permette di usare "await db.execute(...)" nei tuoi controller.
module.exports = pool.promise();                                                                