import React from 'react';
import { FiSave } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.css'; 

export default function ClientModal({ show, onClose, data, handleChange, handleSubmit, loading, isEditing }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* زر الإغلاق */}
        <button className="modal-close" onClick={onClose}>
            <AiOutlineClose size={24} />
        </button>

        <h3>{isEditing ? "Modifier le client" : "Ajouter un nouveau client"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
            <label>CIN :</label>
            <input type="text" name="cin" value={data.cin} onChange={handleChange} required />
            
            <div className="date-row">
                <div className="date-field">
                    <label>Nom :</label>
                    <input type="text" name="nom" value={data.nom} onChange={handleChange} required />
                </div>
                <div className="date-field">
                    <label>Prénom :</label>
                    <input type="text" name="prenom" value={data.prenom} onChange={handleChange} required />
                </div>
            </div>
            <div className="date-row">
                <div className="date-field">
                    <label>Ville :</label>
                    <input type="text" name="ville" value={data.ville} onChange={handleChange} required />
                </div>
                <div className="date-field">
                    <label>Rue :</label>
                    <input type="text" name="rue" value={data.rue} onChange={handleChange} required />
                </div>
            </div>
            <label>Téléphone :</label>
            <input type="text" name="telephone" value={data.telephone} onChange={handleChange} required />

            <label>Email :</label>
            <input type="email" name="email" value={data.email} onChange={handleChange} required />

            <div className="modal-actions">
                <button className="btn-save" type="submit" disabled={loading}>
                <FiSave /> {loading ? 'Sauvegarde...' : 'Enregistrer'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
