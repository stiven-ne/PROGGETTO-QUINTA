import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Inseriamo i dati per la registrazione
      await api.post('/auth/register', { email, password });
      alert("Registrazione completata con successo!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Errore durante la registrazione");
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '30px' }}>
        <h2>Crea il tuo Account</h2>
        <p>Benvenuto in Silver Palm Tree</p>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email Aziendale" 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: '10px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ padding: '10px' }}
          />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Registrati Ora
          </button>
        </form>
        <p style={{ marginTop: '20px' }}> Hai già un account? <a href="/login">Accedi</a></p>
      </div>
    </div>
  );
};

export default Register;