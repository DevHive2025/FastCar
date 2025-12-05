import React, { useState } from 'react';
import './ClientForm.css';

const API_URL = 'http://localhost:8080/api/clients'; 

const ClientForm = ({ onSaveOrCancel, clientToEdit = null }) => {
    const initialFormState = clientToEdit ? {
        cin: clientToEdit.cin || '',
        nom: clientToEdit.nom || '',
        prenom: clientToEdit.prenom || '',
        rue: clientToEdit.rue || '',
        ville: clientToEdit.ville || '',
        telephone: clientToEdit.telephone || '',
        email: clientToEdit.email || '',
    } : {
        cin: '',
        nom: '',
        prenom: '',
        rue: '',
        ville: '',
        telephone: '',
        email: '',
    };
    
    const [clientData, setClientData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const method = clientToEdit ? 'PUT' : 'POST';
        const url = clientToEdit ? `${API_URL}/${clientToEdit.id}` : API_URL;

        try {
            console.log('Données envoyées:', clientData);
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la ${clientToEdit ? 'mise à jour' : 'création'} du client.`);
            }

            onSaveOrCancel(); 

        } catch (err) {
            console.error("Erreur de sauvegarde:", err);
            setError(err.message || "Échec de la connexion au serveur. Vérifiez le Backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <div className="form-content">
                    <h2 className="form-title">
                        {clientToEdit ? 'Éditer le Client' : 'Ajouter un Nouveau Client'}
                    </h2>
                    
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="client-form">
                        {/* Champ CIN */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="cin"
                                name="cin"
                                value={clientData.cin}
                                onChange={handleChange}
                                placeholder="CIN (Carte d'Identité Nationale) *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Nom */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={clientData.nom}
                                onChange={handleChange}
                                placeholder="Nom *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Prénom */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={clientData.prenom}
                                onChange={handleChange}
                                placeholder="Prénom *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Rue */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="rue"
                                name="rue"
                                value={clientData.rue}
                                onChange={handleChange}
                                placeholder="Rue *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Ville */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={clientData.ville}
                                onChange={handleChange}
                                placeholder="Ville *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Téléphone */}
                        <div className="form-group">
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={clientData.telephone}
                                onChange={handleChange}
                                placeholder="Téléphone *"
                                required
                                className="form-input"
                            />
                        </div>

                        {/* Champ Email */}
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={clientData.email}
                                onChange={handleChange}
                                placeholder="Email *"
                                required
                                className="form-input"
                            />
                        </div>
                        
                        {/* Note pour les champs obligatoires */}
                        <div className="required-note">
                            <span className="required-star">*</span> Champs obligatoires
                        </div>
                        
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={onSaveOrCancel}
                                disabled={isLoading}
                                className="btn btn-cancel"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-save"
                            >
                                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;