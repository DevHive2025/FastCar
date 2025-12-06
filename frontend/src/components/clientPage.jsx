import { useState} from 'react';
import { FaTrash, FaPlus, FaSearch, FaEdit } from 'react-icons/fa';
import { useClients } from '../services/fetch';
import './Lists.css';
import ClientModal from './ClientModal'; 

function ClientPage() {
  const {clients, loading, error, fetchClients, addClient, updateClient, deleteClient} = useClients();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    ville: "",
    rue: "",
    telephone: "",
    email: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleAddClick = () => {
    setModalData({
      cin: "",
      nom: "",
      prenom: "",
      ville: "",
      rue: "",
      telephone: "",
      email: ""
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (client) => {
    setModalData({ ...client });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateClient(modalData.cin, modalData);
    else await addClient(modalData);
    setShowModal(false);
    fetchClients(); 
  };

  const handleDelete = async (cin) => {
    if (window.confirm(`Voulez-vous supprimer le client CIN ${cin} ?`)) {
      await deleteClient(cin);
      fetchClients();
    }
  };

  const filteredClients = clients.filter(c =>
    c.cin.toLowerCase().includes(search.toLowerCase()) ||
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.prenom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header-section">
        <div>
            <h2 className="module-title">LISTE DES CLIENTS</h2>
        </div>
      </div>

      {error && <div className="error">{error.message}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Ville</th>
              <th>Rue</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.cin}>
                <td>{client.cin}</td>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.ville}</td>
                <td>{client.rue}</td>
                <td>{client.telephone}</td>
                <td>{client.email}</td>
                <td className="action-icons">
                  <FaEdit size={18} onClick={() => handleEditClick(client)} title="Modifier" />
                  <FaTrash size={18} onClick={() => handleDelete(client.cin)} title="Supprimer" />
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  Aucun client trouvé.
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
        <p className="content-zone">Total des Clients : {clients.length}</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="search-icon" size={20} />
        </div>
      </div>

      {showModal && (
        <ClientModal
          show={showModal}
          onClose={() => setShowModal(false)}
          data={modalData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default ClientPage;
