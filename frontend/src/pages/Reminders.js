import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: '', amount: '', dueDate: '' });

  const loadReminders = async () => {
    try {
      const res = await api.get('/reminders');
      setReminders(res.data);
    } catch (err) {
      console.error("Errore caricamento promemoria", err);
    }
  };

  useEffect(() => { loadReminders(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reminders', newReminder);
      setNewReminder({ title: '', amount: '', dueDate: '' });
      loadReminders();
    } catch (err) {
      alert("Errore nell'aggiunta del promemoria");
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Pianificazione Pagamenti Ricorrenti</h2>
      
      <div className="card" style={{ marginBottom: '30px', padding: '20px' }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Nome Scadenza (es. Affitto)" 
            value={newReminder.title}
            onChange={e => setNewReminder({...newReminder, title: e.target.value})} required style={{ flex: 2, padding: '8px' }} />
          <input type="number" placeholder="Importo €" 
            value={newReminder.amount}
            onChange={e => setNewReminder({...newReminder, amount: e.target.value})} style={{ flex: 1, padding: '8px' }} />
          <input type="date" 
            value={newReminder.dueDate}
            onChange={e => setNewReminder({...newReminder, dueDate: e.target.value})} required style={{ flex: 1, padding: '8px' }} />
          <button type="submit" style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Aggiungi
          </button>
        </form>
      </div>

      <div className="calendar-view">
        <h3>Prossime Scadenze</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {reminders.map(r => {
            const isUrgent = new Date(r.due_date) < new Date(Date.now() + 2*24*60*60*1000);
            return (
              <div key={r.id} className="card" 
                   style={{
                     borderLeft: isUrgent ? '6px solid #e74c3c' : '6px solid #2ecc71',
                     padding: '15px',
                     backgroundColor: 'white',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                   }}>
                <p style={{ margin: '0 0 10px 0' }}><strong>{r.title}</strong></p>
                <p style={{ margin: '5px 0' }}>📅 Scadenza: {new Date(r.due_date).toLocaleDateString()}</p>
                <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>Importo: {Number(r.amount).toFixed(2)}€</p>
                {isUrgent && <span style={{color: '#e74c3c', fontWeight: 'bold', fontSize: '12px'}}>⚠️ SCADENZA IMMINENTE</span>}
              </div>
            );
          })}
        </div>
        {reminders.length === 0 && <p>Nessuna scadenza programmata.</p>}
      </div>
    </div>
  );
};

export default Reminders;