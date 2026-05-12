import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Reminders from './pages/Reminders'; // AGGIUNTO
import Navbar from './components/Navbar';

// Funzione per proteggere le rotte (Solo chi ha il token entra)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate replace to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      {/* Il div container serve per centrare il contenuto sotto la navbar */}
      <div className="container" style={{ paddingTop: '20px' }}>
        <Routes>
          {/* Rotte Pubbliche */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotte Protette (Multi-Tenant) */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
          <Route path="/reminders" element={<PrivateRoute><Reminders /></PrivateRoute>} />
          
          {/* Reindirizzamento automatico */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;