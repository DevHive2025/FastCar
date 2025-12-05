
import {useFetchcontrats} from '../services/fetch'
import { useState, useEffect } from 'react';
import './Lists.css';
import { FaTrash , FaPlus, FaSearch, FaSyncAlt, FaEdit, FaPrint, FaCalendarAlt, FaCar, FaUser,FaFileInvoice,FaArrowLeft} from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
function Facture (){
    const { contrats } = useFetchcontrats();
  return (
    <Router>
      <div className="flex flex-col  	justify-center	items-center h-screen">
        
        <Routes>
          <Route path="/" element={<FactureList contrats={contrats} />} />
          <Route path="/facture/:numContrat" element={<FactureDetail contrats={contrats} />} />
        </Routes>
      </div>
    </Router>
  );
};
function FactureList({contrats}){
    const [search, setSearch] = useState("");

    return (
        <div className="container">
        <div className="header-section">
            <div>
            <h2 className="module-title">FACTURE DE LOCATION </h2>
            </div>
        </div>

        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                    <th>N° Contrat</th>
                    <th>Cilent (CIN)</th>
                    <th>Voiture (Matricule)</th>
                    <th>Agent (N° Agent)</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contrats
                        .filter(c => 
                        c.numContrat.toLowerCase().includes(search.toLowerCase())||
                        c.client.cin.toLowerCase().includes(search.toLowerCase()) || 
                        c.car.matricule.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((contrat) => (
                        <tr key={contrat.numContrat}>
                            <td>{contrat.numContrat}</td>
                            <td>{contrat.client.cin}</td>
                            <td>{contrat.car.matricule}</td>
                            <td>{contrat.agent.numAgent}</td>
                            <Link to={`/facture/${contrat.numContrat}`} className='action-icons'>
                                <FaPrint size={20}/>
                            </Link>
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
            <FaSearch className="search-icon" size={20}/>
            </div>
        </div>
        </div>
    );
}
function FactureDetail({contrats}){
      const { numContrat } = useParams();      
      const contrat = contrats.find (c => c.numContrat == String(numContrat));
      const [search, setSearch] = useState("");

      const calculerMontant = ()=>{
        if (!contrat) return 0;

        const dateDebut = new Date(contrat.dateDebut);
        const dateFin = new Date(contrat.dateFin);
        const diffdate = Math.abs(dateFin-dateDebut);
        const diffDays = Math.ceil(diffdate/(1000*60*60*24));
        return contrat.car.prix * diffDays;
      }
      const montantTotale = calculerMontant();
    if (!contrat) {
    return (
      <div className="facture-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#e74c3c' }}>Facture non trouvée</h2>
          <Link to="/" className="btn-return">
            <FaArrowLeft /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }
    return (
        <div className="container">
        <div className="facture-header">
            <div>
            <h1 className="facture-title">FACTURE DE LOCATION </h1>
            <h2 className='agence-title'>AGENCE AUTO-LOC MAROC</h2>
            </div>
        </div>
        {/* contrat */}
        <h3 className='section-title'>
            <FaCalendarAlt/>DÉTAILS DU CONTRAT
        </h3>
        <div className="facture-table-container">
            <table className="facture-table">
                <thead>
                    <tr>
                    <th>N° Contrat</th>
                    <th>dateDebut</th>
                    <th>dateFin</th>
                    <th>Montant</th>
                    <th>Mode de paiement</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={contrat.numContrat}>
                            <td><strong>{contrat.numContrat}</strong></td>
                            <td>{contrat.dateDebut}</td>
                            <td>{contrat.dateFin}</td>
                            <td>{montantTotale} <strong>MAD</strong></td>
                            <td>{contrat.modPaiement}</td>
                        </tr>
                </tbody>
                </table>
                {/*client*/}
                <h3 className='section-title'>
                    <FaUser/>Informations Client
                </h3>
                <table className="facture-table">
                <title>CLIENT</title>
                <thead>
                    <tr>
                    <th>N° CLIENT(CIN)</th>
                    <th>NOM</th>
                    <th>PRENOM</th>
                    <th>ADRESSE</th>
                    <th>TELEPHONE</th>
                    <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={contrat.client.cin}>
                            <td>{contrat.client.cin}</td>
                            <td>{contrat.client.nom}</td>
                            <td>{contrat.client.prenom}</td>
                            <td>{contrat.client.ville},{contrat.client.rue}</td>
                            <td>{contrat.client.telephone}</td>
                            <td>{contrat.client.email}</td>
                        </tr>
                </tbody>
                </table>
                
                {/* voiture */}
                <h3 className='section-title'>
                    <FaCar/>VÉHICULE LOUÉ
                </h3>
                <table className="facture-table">
                <thead>
                    <tr>
                    <th>MATRICULE</th>
                    <th>MARQUE</th>
                    <th>MODELE</th>
                    <th>PRIX JOURNALIER</th>
                    <th>ETAT</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={contrat.car.matricule}>
                            <td>{contrat.car.matricule}</td>
                            <td>{contrat.car.marque}</td>
                            <td>{contrat.car.modele}</td>
                            <td>{contrat.car.prix}</td>
                            <td>{contrat.car.etat}</td>
                        </tr>
                </tbody>
                </table>
                {/* agent */}
                <h3 className='section-title'>
                    <FaFileInvoice/>Informations Agence
                </h3>
                <table className="facture-table">
                <title>AGENT</title>
                 <thead>
                    <tr>
                    <th>N° AGENT</th>
                    <th>NOM</th>
                    <th>PRENOM</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={contrat.agent.numAgent}>
                            <td>{contrat.agent.numAgent}</td>
                            <td>{contrat.agent.nom}</td>
                            <td>{contrat.agent.prenom}</td>
                        </tr>
                </tbody>
            </table>
        </div>
        {/*footer */}
        <div className="facture-footer">
            <p style={{ marginTop: '20px' }}>Siége social : BD Mohammed V,Casablanca</p>
            <p style={{ marginTop: '20px' }}>Tél : 05 22 33 44 56 | RC : 123456 | Patente : 78901432</p>
            <p style={{ marginTop: '20px' }}>Merci de Votre confiance !</p>
        </div>

        <div className="facture-actions">
            <Link to={`/`} className='btn-return'>
            <FaArrowLeft /> Retour à la liste
            </Link>
            <button className='btn-print' onClick={()=>window.print()}>
                <FaPrint/>Imprimer la facture
            </button>
        </div>
        </div>
    );
}

export default Facture;

