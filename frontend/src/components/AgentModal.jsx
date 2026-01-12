import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';

function AgentModal({ show, onClose, data, handleChange, handleSubmit, loading, isEditing }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
            <AiOutlineClose size={24} />
        </button>

        <h3>{isEditing ? "Modifier l'Agent" : "Ajouter un Agent"}</h3>

        <form className="modal-form" onSubmit={handleSubmit}>
          
          <label>N Agent</label>
          <input
            type="text"
            name="numAgent"
            value={data.numAgent}
            onChange={handleChange}
            disabled={isEditing}
            required
          />

          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={data.nom}
            onChange={handleChange}
            required
          />

          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={data.prenom}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button className="btn-save" type="submit">
              {loading ? "Enregistrement..." : (isEditing ? "Modifier" : "Ajouter")}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AgentModal;
