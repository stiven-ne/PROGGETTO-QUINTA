import axios from 'axios';

// Creazione dell'istanza Axios con la URL del tuo Backend MySQL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// INTERCEPTOR DI RICHIESTA: Inserisce il Token in ogni chiamata
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Questo header permette al Backend di identificare l'utente e il suo Tenant_id
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// INTERCEPTOR DI RISPOSTA: Gestisce errori di autorizzazione (Token scaduto o invalido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se il server risponde 401 (Non autorizzato) o 403 (Proibito)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Sessione scaduta o accesso negato. Reindirizzamento al login...");
      
      // Puliamo il localStorage per evitare loop di errori
      localStorage.clear();
      
      // Forza il ritorno al login se siamo nel browser
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;