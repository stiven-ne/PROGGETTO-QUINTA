import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportButtons = ({ data }) => {
  // Se non ci sono dati, non mostrare i bottoni o gestisci il caso
  if (!data || data.length === 0) return null;

  const exportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Report Finanziario - Silver Palm Tree", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generato il: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = ["Data", "Categoria", "Descrizione", "Tipo", "Importo (€)"];
    const tableRows = [];

    data.forEach(t => {
      const transactionData = [
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.description || "-",
        t.type.toUpperCase(),
        // Usiamo Number() per sicurezza se il dato arriva come stringa da MySQL
        Number(t.amount).toFixed(2) 
      ];
      tableRows.push(transactionData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [46, 204, 113] }
    });

    doc.save(`report_finanziario_${new Date().getTime()}.pdf`);
  };

  const exportCSV = () => {
    const csvRows = [];
    const headers = ["Data", "Categoria", "Descrizione", "Tipo", "Importo"];
    csvRows.push(headers.join(','));

    data.forEach(t => {
      const row = [
        new Date(t.date).toLocaleDateString(),
        `"${t.category}"`, // Aggiungiamo i doppi apici per evitare problemi con le virgole
        `"${t.description || '-'}"`,
        t.type,
        Number(t.amount)
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transazioni_silver_palm.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Pulizia del DOM
  };

  return (
    <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
      <button onClick={exportPDF} style={{ 
        backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' 
      }}>
        📄 Scarica PDF
      </button>
      <button onClick={exportCSV} style={{ 
        backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' 
      }}>
        📊 Scarica CSV
      </button>
    </div>
  );
};

export default ExportButtons;