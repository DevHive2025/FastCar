import React, { useState, useRef } from 'react';
import { useFetchcontrats } from '../services/fetch';
import { FaPrint, FaCalendarAlt, FaCar, FaUser, FaFileInvoice, FaArrowLeft } from 'react-icons/fa';
import { Link, Routes, Route, useParams, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Lists.css';

function Facture() {
  const { contrats, loading } = useFetchcontrats(); 
  const location = useLocation();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>;
  }


  if (location.pathname === '/facture') {
    return <FactureList contrats={contrats} />;
  }

  return (
    <Routes>
      <Route path="/" element={<FactureList contrats={contrats} />} />
      <Route path=":numContrat" element={<FactureDetail contrats={contrats} />} />
    </Routes>
  );
}

function FactureList({ contrats }) {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <div className="header-section">
        <h2 className="module-title">FACTURE DE LOCATION</h2>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N° Contrat</th>
              <th>Client (CIN)</th>
              <th>Voiture (Matricule)</th>
              <th>Agent (N° Agent)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contrats
              .filter(c =>
                c.numContrat.toLowerCase().includes(search.toLowerCase()) ||
                c.client.cin.toLowerCase().includes(search.toLowerCase()) ||
                c.car.matricule.toLowerCase().includes(search.toLowerCase())
              )
              .map((contrat) => (
                <tr key={contrat.numContrat}>
                  <td>{contrat.numContrat}</td>
                  <td>{contrat.client.cin}</td>
                  <td>{contrat.car.matricule}</td>
                  <td>{contrat.agent.numAgent}</td>
                  <td>
                    <Link to={`/facture/${contrat.numContrat}`} className='action-icons'>
                      <FaPrint size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function FactureDetail({ contrats }) {
  const { numContrat } = useParams();
  const factureRef = useRef(null);
  const contrat = contrats.find(c => c.numContrat === String(numContrat));

  if (!contrat) {
    return (
      <div className="facture-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#e74c3c' }}>Facture non trouvée</h2>
        <Link to="/facture" className="btn-return">
          <FaArrowLeft /> Retour à la liste
        </Link>
      </div>
    );
  }

  const calculerMontant = () => {
    const dateDebut = new Date(contrat.dateDebut);
    const dateFin = new Date(contrat.dateFin);
    const diffDays = Math.ceil(Math.abs(dateFin - dateDebut) / (1000 * 60 * 60 * 24));
    return contrat.car.prix * diffDays;
  };

  const montantTotale = calculerMontant();

  const handlePrint = () => {
    const input = factureRef.current;
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // margin
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save(`Facture-${contrat.numContrat}.pdf`);
    });
  };

  return (
    <>
      <div className="container facture-pdf" ref={factureRef} style={{ padding: '20px', background: '#fff' }}>
        <div className="facture-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px' }}>FACTURE DE LOCATION</h1>
          <h2 style={{ fontSize: '18px' }}>AGENCE FASTCAR MAROC</h2>
        </div>

        <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}><FaCalendarAlt /> DÉTAILS DU CONTRAT</h3>
        <table className="facture-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <th>N° Contrat</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Montant</th>
              <th>Mode de paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contrat.numContrat}</td>
              <td>{contrat.dateDebut}</td>
              <td>{contrat.dateFin}</td>
              <td>{montantTotale} MAD</td>
              <td>{contrat.modPaiement}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}><FaUser /> Informations Client</h3>
        <table className="facture-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <th>CIN</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contrat.client.cin}</td>
              <td>{contrat.client.nom}</td>
              <td>{contrat.client.prenom}</td>
              <td>{contrat.client.ville}, {contrat.client.rue}</td>
              <td>{contrat.client.telephone}</td>
              <td>{contrat.client.email}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}><FaCar /> VÉHICULE LOUÉ</h3>
        <table className="facture-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <th>Matricule</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Prix journalier</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contrat.car.matricule}</td>
              <td>{contrat.car.marque}</td>
              <td>{contrat.car.modele}</td>
              <td>{contrat.car.prix}</td>
              <td>{contrat.car.etat}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}><FaFileInvoice /> Informations Agence</h3>
        <table className="facture-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <th>N° Agent</th>
              <th>Nom</th>
              <th>Prénom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contrat.agent.numAgent}</td>
              <td>{contrat.agent.nom}</td>
              <td>{contrat.agent.prenom}</td>
            </tr>
          </tbody>
        </table>

        <div className="facture-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Siège social : BD Mohammed V, Casablanca</p>
          <p>Tél : 05 22 33 44 56 | RC : 123456 | Patente : 78901432</p>
          <p>Merci de votre confiance !</p>
        </div>
      </div>

      <div className="facture-actions" style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/facture" className='btn-return'><FaArrowLeft /> Retour à la liste</Link>
        <button className='btn-print' onClick={handlePrint}><FaPrint /> Télécharger PDF</button>
      </div>
    </>
  );
}

export default Facture;
