import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });
  const [totals, setTotals] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/transactions');
        const data = res.data;

        const categories = {};
        let inc = 0, exp = 0;

        data.forEach(t => {
          const val = parseFloat(t.amount);
          if (t.type === 'uscita') {
            categories[t.category] = (categories[t.category] || 0) + val;
            exp += val;
          } else {
            inc += val;
          }
        });

        setTotals({ income: inc, expenses: exp });

        setPieData({
          labels: Object.keys(categories),
          datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }]
        });

        setChartData({
          labels: ['Riepilogo'],
          datasets: [
            { label: 'Entrate', data: [inc], backgroundColor: '#2ecc71' },
            { label: 'Uscite', data: [exp], backgroundColor: '#e74c3c' }
          ]
        });

      } catch (err) { console.error("Errore caricamento dati", err); }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cruscotto Finanziario</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={styles.cardGreen}><h3>Entrate</h3><p>{totals.income.toFixed(2)} €</p></div>
        <div style={styles.cardRed}><h3>Uscite</h3><p>{totals.expenses.toFixed(2)} €</p></div>
        <div style={styles.cardBlue}><h3>Saldo</h3><p>{(totals.income - totals.expenses).toFixed(2)} €</p></div>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={styles.chartBox}><h3>Entrate vs Uscite</h3><Bar data={chartData} /></div>
        <div style={styles.chartBox}><h3>Spese per Categoria</h3><Pie data={pieData} /></div>
      </div>
    </div>
  );
};

const styles = {
  cardGreen: { flex: 1, padding: '20px', backgroundColor: '#e8f5e9', borderLeft: '5px solid #2ecc71', borderRadius: '8px' },
  cardRed: { flex: 1, padding: '20px', backgroundColor: '#fdecea', borderLeft: '5px solid #e74c3c', borderRadius: '8px' },
  cardBlue: { flex: 1, padding: '20px', backgroundColor: '#ebf5fb', borderLeft: '5px solid #3498db', borderRadius: '8px' },
  chartBox: { flex: 1, minWidth: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }
};

export default Dashboard;