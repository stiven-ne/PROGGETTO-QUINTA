require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // La connessione MySQL

// Import delle Rotte
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware base
app.use(cors());
app.use(express.json());

// Collegamento Rotte
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/data', apiRoutes);

// Test Connessione Database
db.getConnection()
    .then(connection => {
        console.log("✅ Database MySQL Connesso (phpMyAdmin)");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Errore connessione Database:", err.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Multi-Tenant attivo sulla porta ${PORT}`);
});