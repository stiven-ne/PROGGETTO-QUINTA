import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('Cibo');

  // Carica i budget esistenti all'avvio
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await api.get('/budgets'); // Chiama la rotta che abbiamo creato nel dataController
      setBudgets(res.data);
    } catch (err) {
      console.error("Errore nel caricamento dei budget", err);
    }
  };

  const saveBudget = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    try {
      // IMPORTANTE: usiamo 'limit_amount' per combaciare con la colonna MySQL
      await api.post('/budgets', { 
        category, 
        limit_amount: parseFloat(limit), 
        month, 
        year 
      });
      
      alert("Budget salvato correttamente!");
      setLimit(''); // Pulisce il campo
      fetchBudgets(); // Aggiorna la lista
    } catch (err) {
      alert("Errore durante il salvataggio del budget");
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Impostazione Budget Mensile</h2>
      
      {/* Form di Inserimento */}
      <div className="card" style={styles.formCard}>
        <select value={category} onChange={e => setCategory(e.target.value)} style={styles.input}>
          <option value="Cibo">Cibo</option>
          <option value="Trasporti">Trasporti</option>
          <option value="Svago">Svago</option>
          <option value="Affitto">Affitto</option>
          <option value="Bollette">Bollette</option>
        </select>
        
        <input 
          type="number" 
          value={limit}
          placeholder="Limite mensile €" 
          onChange={e => setLimit(e.target.value)} 
          style={styles.input}
        />
        
        <button onClick={saveBudget} style={styles.button}>Imposta Limite</button>
      </div>

      {/* Lista Budget Esistenti */}
      <div style={{ marginTop: '30px' }}>
        <h3>I Tuoi Limiti Attuali</h3>
        <div style={styles.grid}>
          {budgets.map((b) => (
            <div key={b.id} style={styles.budgetCard}>
              <strong>{b.category}</strong>
              <p style={{ fontSize: '20px', margin: '5px 0' }}>{Number(b.limit_amount).toFixed(2)} €</p>
              <small>Mese: {b.month}/{b.year}</small>
            </div>
          ))}
          {budgets.length === 0 && <p>Nessun budget impostato per questo mese.</p>}
        </div>
      </div>
    </div>
  );
};

// Stili base per rendere l'interfaccia pulita
const styles = {
  formCard: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flex: 1 },
  button: { padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' },
  budgetCard: { padding: '15px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center', backgroundColor: 'white' }
};

export default Budget;