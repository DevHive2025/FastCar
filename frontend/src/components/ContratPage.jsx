import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaSearch, FaEdit, FaPrint } from 'react-icons/fa';
import { useContrats, useAgents, useCars, useClients } from '../services/fetch';
import './Lists.css';
import ContratModal from './ContratModal';

function ContratPage() {
  const { contrats, addContrat, updateContrat, deleteContrat, loading, error } = useContrats();
  const { cars } = useCars();
  const { clients } = useClients();
  const { agents } = useAgents();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    numContrat: "",
    car: null,
    client: null,
    agent: null,
    dateDebut: "",
    dateFin: "",
    modPaiement: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const aujourdhuiYYYYMMDD = new Date().toISOString().split('T')[0];

  const getEtat = (matricule) => {
    const contratActif = contrats.find(c =>
      c.car?.matricule === matricule && new Date(c.dateFin) >= new Date(aujourdhuiYYYYMMDD)
    );
    return contratActif ? 'Louée' : 'Disponible';
  };


  const generateNumContrat = () => {
    const year = new Date().getFullYear();
    let lastNumber = 0;
    if (contrats.length > 0) {
      const lastContrat = contrats[contrats.length - 1].numContrat;
      const match = lastContrat.match(/LOC-\d{4}-(\d+)/);
      if (match) lastNumber = parseInt(match[1], 10);
    }
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `LOC-${year}-${newNumber}`;
  };

  const handleAddClick = () => {
    setModalData({
      numContrat: generateNumContrat(),
      car: null,
      client: null,
      agent: null,
      dateDebut: "",
      dateFin: "",
      modPaiement: ""
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (contrat) => {
    setModalData({ ...contrat });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'car') setModalData({ ...modalData, car: cars.find(c => c.matricule === value) });
    else if (name === 'client') setModalData({ ...modalData, client: clients.find(c => c.cin === value) });
    else if (name === 'agent') setModalData({ ...modalData, agent: agents.find(a => a.numAgent === value) });
    else setModalData({ ...modalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalData.car.matricule && getEtat(modalData.car.matricule)==='Disponible' && !isEditing) {
        await addContrat(modalData);
    }
    else if (isEditing) {
      await updateContrat(modalData.numContrat, modalData);
    }
    setShowModal(false);
  };

  const handleDelete = async (numContrat) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce contrat ?")) {
      await deleteContrat(numContrat);
    }
  };
  const filteredContrats = contrats.filter(c =>
                    c.numContrat.toLowerCase().includes(search.toLowerCase()) ||
                    c.client?.cin?.toLowerCase().includes(search.toLowerCase()) ||
                    c.car?.matricule?.toLowerCase().includes(search.toLowerCase())
                );

  return (
    <div className="container">
      <div className="header-section">
        <div>
            <h2 className="module-title">LISTE DES CONTRATS ENREGISTRÉS</h2>
        </div>
      </div>

      {error && <div className="error">Erreur: {error.message}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N Contrat</th>
              <th>Client (CIN)</th>
              <th>Voiture (Matricule)</th>
              <th>Période (Début-Fin)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContrats.map(c => (
                    <tr key={c.numContrat}>
                    <td>{c.numContrat}</td>
                    <td>{c.client?.cin}</td>
                    <td>{c.car?.matricule}</td>
                    <td>{c.dateDebut} - {c.dateFin}</td>
                    <td className="action-icons">
                        <Link to={`/facture/${c.numContrat}`} className='action-icons'>
                              <FaPrint size={20}/>
                        </Link>
                        <FaEdit size={20} onClick={() => handleEditClick(c)} title="Modifier" />
                        <FaTrash size={20} onClick={() => handleDelete(c.numContrat)} title="Supprimer" />
                    </td>
                    </tr>
                ))
            }
            {filteredContrats.length === 0 && (
                <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>
                    Aucun agent trouvé.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="btn btn-add" onClick={handleAddClick}>
          <FaPlus size={20} /> Ajouter
        </button>
        <p className="content-zone">Total des Contrats : {contrats.length} </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="search-icon" size={20} />
        </div>
      </div>

      {showModal && (<ContratModal
            show={showModal}
            onClose={() => setShowModal(false)}
            data={modalData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            clients={clients}
            cars={cars}
            agents={agents}
            isEditing={isEditing}
  />)}
    </div>
  );
}

export default ContratPage;
