import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportData = ({ data }) => {
  const downloadPDF = () => {
    // Se non ci sono dati, evitiamo di generare un PDF vuoto
    if (!data || data.length === 0) {
      alert("Nessun dato disponibile da esportare");
      return;
    }

    const doc = new jsPDF();
    
    // Titolo stilizzato
    doc.setFontSize(16);
    doc.text("Report Transazioni - Silver Palm Tree", 14, 15);
    
    // Data di generazione
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generato il: ${new Date().toLocaleString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Data', 'Categoria', 'Importo (€)', 'Tipo']],
      body: data.map(t => [
        // 1. Formattazione Data per MySQL
        new Date(t.date).toLocaleDateString(), 
        t.category, 
        // 2. Forza il numero per evitare errori con le stringhe SQL
        Number(t.amount).toFixed(2), 
        // 3. Rende il tipo (entrata/uscita) maiuscolo per estetica
        t.type.toUpperCase()
      ]),
      theme: 'grid',
      headStyles: { fillColor: [46, 204, 113] }, // Un bel verde Silver Palm
    });

    doc.save(`report_silver_palm_${new Date().getTime()}.pdf`);
  };

  return (
    <button 
      onClick={downloadPDF} 
      style={{
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      📄 Esporta in PDF
    </button>
  );
};

export default ExportData;