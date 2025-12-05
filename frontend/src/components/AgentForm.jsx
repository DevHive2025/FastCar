import React, { useState } from 'react';
import './ClientForm.css'; // On importe le même fichier CSS

const API_URL = 'http://localhost:8080/api/agents'; 

const AgentForm = ({ onSaveOrCancel, agentToEdit = null }) => {
    const initialFormState = agentToEdit ? {
        numAgent: agentToEdit.numAgent || '',
        nom: agentToEdit.nom || '',
        prenom: agentToEdit.prenom || '',
    } : {
        numAgent: '',
        nom: '',
        prenom: '',
    };
    
    const [agentData, setAgentData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const method = agentToEdit ? 'PUT' : 'POST';
        const url = agentToEdit ? `${API_URL}/${agentToEdit.id}` : API_URL;

        try {
            console.log('Données envoyées:', agentData);
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agentData),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la ${agentToEdit ? 'mise à jour' : 'création'} de l'agent.`);
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
                        {agentToEdit ? 'Éditer l\'Agent' : 'Ajouter un Nouvel Agent'}
                    </h2>
                    
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="client-form">
                        {/* Champ Numéro Agent */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="numAgent"
                                name="numAgent"
                                value={agentData.numAgent}
                                onChange={handleChange}
                                placeholder="Numéro d'Agent *"
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
                                value={agentData.nom}
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
                                value={agentData.prenom}
                                onChange={handleChange}
                                placeholder="Prénom *"
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

export default AgentForm;