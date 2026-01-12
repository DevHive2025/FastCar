import { useState } from 'react';
import { FaTrash, FaPlus, FaSearch, FaEdit } from 'react-icons/fa';
import { useAgents } from '../services/fetch';
import './Lists.css';
import AgentModal from './AgentModal';

function AgentPage() {
  const {agents, loading, error, fetchAgents, addAgent, updateAgent, deleteAgent } = useAgents();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    numAgent : "",
    nom: "",
    prenom: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleAddClick = () => {
    setModalData({
      numAgent: "",
      nom: "",
      prenom: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (agent) => {
    setModalData({ ...agent });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateAgent(modalData.numAgent, modalData);
    else await addAgent(modalData);
    setShowModal(false);
    fetchAgents();
  };

  const handleDelete = async (numAgent) => {
    if (window.confirm(`Voulez-vous supprimer l'agent ${numAgent} ?`)) {
      await deleteAgent(numAgent);
      fetchAgents();
    }
  };

  const filteredAgents = agents.filter(a =>
    a.numAgent.toLowerCase().includes(search.toLowerCase()) ||
    a.nom.toLowerCase().includes(search.toLowerCase()) ||
    a.prenom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header-section">
        <h2 className="module-title">LISTE DES AGENTS</h2>
      </div>

      {error && <div className="error">{error.message}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N Agent</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAgents.map(agent => (
              <tr key={agent.numAgent}>
                <td>{agent.numAgent}</td>
                <td>{agent.nom}</td>
                <td>{agent.prenom}</td>

                <td className="action-icons">
                  <FaEdit size={18} onClick={() => handleEditClick(agent)} />
                  <FaTrash size={18} onClick={() => handleDelete(agent.numAgent)} />
                </td>
              </tr>
            ))}

            {filteredAgents.length === 0 && (
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
        <p className="content-zone">Total des Agents : {agents.length}</p>
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
        <AgentModal
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

export default AgentPage;
