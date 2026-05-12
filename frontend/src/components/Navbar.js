import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Recuperiamo token e ruolo dal localStorage
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role'); 

  const handleLogout = () => {
    // Rimuoviamo TUTTI i dati sensibili dell'azienda e dell'utente
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('tenant_id'); // Rimuoviamo anche questo per sicurezza
    
    navigate('/login');
  };

  return (
    <nav className="navbar" style={styles.nav}>
      <h1 style={styles.logo}>Silver Palm Tree</h1>
      
      {token && (
        <ul style={styles.ul}>
          <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          <li><Link to="/transactions" style={styles.link}>Transazioni</Link></li>
          <li><Link to="/budget" style={styles.link}>Budget</Link></li>
          
          {/* MOSTRA IL LINK ADMIN SOLO SE IL RUOLO È ADMIN */}
          {role === 'admin' && (
            <li><Link to="/admin/users" style={styles.linkAdmin}>Gestione Team</Link></li>
          )}
          
          <li>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

// Piccoli stili inline per rendere l'idea (puoi spostarli nel tuo CSS)
const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#2c3e50', color: 'white' },
  logo: { margin: 0, fontSize: '1.5rem' },
  ul: { display: 'flex', listStyle: 'none', gap: '20px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none' },
  linkAdmin: { color: '#f1c40f', fontWeight: 'bold', textDecoration: 'none' }, // Giallo per evidenziare Admin
  logoutBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;