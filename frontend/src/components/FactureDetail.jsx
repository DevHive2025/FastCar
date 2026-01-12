import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';

function FactureDetail({ contrats }) {
  const { numContrat } = useParams();   
  const factureRef = useRef(null);

  const contrat = contrats.find(c => c.numContrat === String(numContrat));

  if (!contrat) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#e74c3c' }}>Facture non trouvée</h2>
        <Link to="/" className="btn-return">
          <FaArrowLeft /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const calculerMontant = () => {
    const dateDebut = new Date(contrat.dateDebut);
    const dateFin = new Date(contrat.dateFin);
    const diffdate = Math.abs(dateFin - dateDebut);
    const diffDays = Math.ceil(diffdate / (1000 * 60 * 60 * 24));
    return contrat.car.prix * diffDays;
  };

  const montantTotale = calculerMontant();

  const handleDownloadPDF = async () => {
    const element = factureRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // حساب الحجم باش يتناسب مع A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Facture_${contrat.numContrat}.pdf`);
  };

  return (
    <div>
      <div className="container" ref={factureRef}>
        <div className="facture-header">
          <h1>FACTURE DE LOCATION</h1>
          <h2>AGENCE AUTO-LOC MAROC</h2>
        </div>

        <h3>Détails du Contrat</h3>
        <table>
          <thead>
            <tr>
              <th>N° Contrat</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Montant</th>
              <th>Mode Paiement</th>
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

        <h3>Client</h3>
        <table>
          <thead>
            <tr>
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

        <h3>Voiture Louée</h3>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Prix Journalier</th>
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

        <h3>Agent</h3>
        <table>
          <thead>
            <tr>
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
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/facture" className="btn-return">
          <FaArrowLeft /> Retour à la liste
        </Link>
        <button onClick={handleDownloadPDF} className="btn-download">
          Télécharger PDF
        </button>
      </div>
    </div>
  );
}

export default FactureDetail;
