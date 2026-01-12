import React from 'react';
import { FiSave } from 'react-icons/fi';
import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';

export default function ContratModal({ show, onClose, data, handleChange, handleSubmit, loading, clients, cars, agents, isEditing }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <button className="modal-close" onClick={onClose}>
            <AiOutlineClose size={24} />
        </button>

        <h3>{isEditing ? "Modifier le contrat" : "Ajouter un nouveau contrat"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Client :</label>
          <select name="client" value={data.client?.cin || ''} onChange={handleChange} required>
            <option value="">--Choisir Client--</option>
            {clients.map(c => <option key={c.cin} value={c.cin}>{c.nom} {c.prenom}</option>)}
          </select>

          <label>Voiture :</label>
          <select name="car" value={data.car?.matricule || ''} onChange={handleChange} required>
            <option value="">--Choisir Voiture--</option>
            {cars.map(c => <option key={c.matricule} value={c.matricule}>{c.marque} {c.modele}</option>)}
          </select>

          <label>Agent :</label>
          <select name="agent" value={data.agent?.numAgent || ''} onChange={handleChange} required>
            <option value="">--Choisir Agent--</option>
            {agents.map(a => <option key={a.numAgent} value={a.numAgent}>{a.nom} {a.prenom}</option>)}
          </select>

          <div className="date-row">
            <div className="date-field">
              <label>Date Début :</label>
              <input type="date" name="dateDebut" value={data.dateDebut} onChange={handleChange} required />
            </div>
            <div className="date-field">
              <label>Date Fin :</label>
              <input type="date" name="dateFin" value={data.dateFin} onChange={handleChange} required />
            </div>
          </div>

          <label>Mode Paiement :</label>
          <input name="modPaiement" value={data.modPaiement} onChange={handleChange} required />

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
