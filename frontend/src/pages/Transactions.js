import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ExportButtons from '../components/ExportButtons';

const Transactions = () => {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({ 
    amount: '', 
    category: 'Cibo', 
    type: 'uscita', 
    description: '' 
  });

  const loadData = async () => {
    try {
      const res = await api.get('/transactions');
      setList(res.data);
    } catch (err) {
      console.error("Errore nel caricamento dati", err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', formData);
      setFormData({ amount: '', category: 'Cibo', type: 'uscita', description: '' });
      loadData(); 
    } catch (err) {
      alert("Errore durante l'inserimento");
    }
  };

  const deleteItem = async (id) => {
    if(window.confirm("Sei sicuro di voler eliminare questa transazione?")) {
      try {
        await api.delete(`/transactions/${id}`);
        loadData();
      } catch (err) {
        alert("Errore durante l'eliminazione");
      }
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Gestione Transazioni</h2>
        <ExportButtons data={list} /> 
      </div>

      <div className="card" style={{ padding: '20px', marginBottom: '30px', backgroundColor: '#fdfdfd' }}>
        <h4>Nuovo Movimento</h4>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="number" 
            placeholder="Importo €" 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            required 
            style={{ padding: '8px', flex: 1 }}
          />
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '8px', flex: 1 }}>
            <option value="Cibo">Cibo</option>
            <option value="Affitto">Affitto</option>
            <option value="Trasporti">Trasporti</option>
            <option value="Salute">Salute</option>
            <option value="Svago">Svago</option>
            <option value="Stipendio">Stipendio</option>
          </select>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ padding: '8px', flex: 1 }}>
            <option value="uscita">Uscita (Spesa)</option>
            <option value="entrata">Entrata (Ricavo)</option>
          </select>
          <button type="submit" style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Aggiungi
          </button>
        </form>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Data</th>
              <th style={{ padding: '12px' }}>Categoria</th>
              <th style={{ padding: '12px' }}>Importo</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{new Date(t.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>{t.category}</td>
                <td style={{ 
                  padding: '12px', 
                  fontWeight: 'bold', 
                  color: t.type === 'uscita' ? '#e74c3c' : '#2ecc71' 
                }}>
                  {t.type === 'uscita' ? '-' : '+'}{Number(t.amount).toFixed(2)}€
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button 
                    onClick={() => deleteItem(t.id)} 
                    style={{ backgroundColor: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>Nessuna transazione trovata.</p>}
      </div>
    </div>
  );
};

export default Transactions;