import React, { useState, useEffect, useMemo } from 'react';
import './ClientList.css'; // ⬅️ Utilisez ce fichier CSS unique

const API_URL = 'http://localhost:8080/api/agents'; 

function AgentTable({ onAddAgent, onEditAgent }){ 
    
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // 💡 NOUVEAU: État pour la recherche

    // [Logique de Récupération (GET)]
    const fetchAgents = async () => {
        setLoading(true);
        setError(null);
        try {
            // ... (logique de fetch inchangée)
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}. Vérifiez le backend et CORS.`);
            }
            const data = await response.json();
            setAgents(data); 
        } catch (err) {
            console.error("Erreur de récupération des agents:", err);
            setError("Erreur: Impossible de charger la liste. Vérifiez le Backend.");
        } finally {
            setLoading(false);
        }
    };
    
    // [Logique de Suppression (DELETE) inchangée]
    const deleteAgent = async (agentId) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet agent ?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${agentId}`, { method: 'DELETE' });
            if (response.ok || response.status === 204) {
                setAgents(agents.filter(agent => agent.id !== agentId));
            } else {
                throw new Error(`Échec de la suppression : ${response.status}`);
            }
        } catch (err) {
            console.error("Erreur de suppression :", err);
            setError(`Erreur lors de la suppression de l'agent.`);
        }
    };
    
    // 💡 NOUVEAU: Logique de Filtrage
    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAgents = useMemo(() => {
        if (!searchTerm) return agents;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return agents.filter(agent => (
            (agent.numAgent && agent.numAgent.toLowerCase().includes(lowerCaseSearch)) ||
            (agent.nom && agent.nom.toLowerCase().includes(lowerCaseSearch)) ||
            (agent.prenom && agent.prenom.toLowerCase().includes(lowerCaseSearch))
        ));
    }, [agents, searchTerm]);


    useEffect(() => {
        fetchAgents();
    }, []); 

    // Affichage des états de chargement/erreur (mise à jour de la classe)
    if (loading) {
        return <div className="client-list-container">Chargement des agents...</div>;
    }

    if (error) {
        return <div className="client-list-container error-message" style={{color: 'red', textAlign: 'center'}}>{error}</div>;
    }

    return (
        <div className="client-list-container"> {/* ⬅️ Classe unifiée */}
            <div className="header-section">
                <div>
                    <h2 className="module-title">MODULE LISTE DES AGENTS</h2> {/* ⬅️ Classe unifiée */}
                    <p className="content-zone">Total d'agents : {agents.length} (Affichés: {filteredAgents.length})</p>
                </div>
                <button className="btn btn-refresh" onClick={fetchAgents} title="Actualiser">
                    🔄 Actualiser
                </button>
            </div>

            <div className="table-container">
                <table className="table-data"> {/* ⬅️ Classe unifiée */}
                    <thead>
                        <tr>
                            <th>Num Agent</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 💡 Utilisation de filteredAgents */}
                        {filteredAgents.length > 0 ? filteredAgents.map((agent) => (
                            <tr key={agent.id}> 
                                <td>{agent.numAgent}</td> 
                                <td>{agent.nom}</td>
                                <td>{agent.prenom}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button 
                                        className="btn-edit"
                                        onClick={() => onEditAgent(agent)}
                                    >
                                        🖊️ Modifier
                                    </button>
                                    <button 
                                        className="btn-delete-row"
                                        style={{marginLeft: '10px'}}
                                        onClick={() => deleteAgent(agent.id)}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                    {searchTerm ? `Aucun agent trouvé pour "${searchTerm}".` : "Aucun agent enregistré."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="action-buttons"> {/* ⬅️ Classe unifiée */}
                <button className="btn btn-add" onClick={onAddAgent}>
                    <span>+</span> Ajouter un Agent
                </button>
                
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Rechercher un agent..."
                        className="search-input"
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>
        </div>
    );
};

export default AgentTable;