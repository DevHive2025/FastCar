import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';

function CarModal({ show, onClose, data, handleChange, handleSubmit, isEditing }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
            <AiOutlineClose size={24} />
        </button>

        <h3>{isEditing ? "Modifier la Voiture" : "Ajouter une Voiture"}</h3>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Matricule</label>
          <input
            type="text"
            name="matricule"
            value={data.matricule}
            onChange={handleChange}
            disabled={isEditing}
            required
          />

          <label>Marque</label>
          <input
            type="text"
            name="marque"
            value={data.marque}
            onChange={handleChange}
            required
          />

          <label>Modèle</label>
          <input
            type="text"
            name="modele"
            value={data.modele}
            onChange={handleChange}
            required
          />
          <div className="date-row">
            <div className="date-field">
              <label>Kilometrage</label>
              <input
                type="number"
                name="kilometrage"
                value={data.kilometrage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="date-field">
              <label>Prix Journalier</label>
              <input
                type="number"
                name="prix"
                value={data.prix}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label>etat</label>
          <input
            type="text"
            name="etat"
            value={data.etat}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button className="btn-save" type="submit">
              {isEditing ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarModal;
