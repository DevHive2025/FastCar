import React, { useState, useEffect, useMemo } from 'react';
import './ClientList.css'; // ⬅️ Utilisez ce fichier CSS unique

// Endpoint pour la récupération des clients
const API_URL = 'http://localhost:8080/api/clients'; 

function ClientTable({ onAddClient, onEditClient }){ 
    
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // 💡 NOUVEAU: État pour la recherche

    // [Logique de Récupération (GET)]
    const fetchClients = async () => {
        setLoading(true);
        setError(null);
        try {
            // ... (logique de fetch inchangée)
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}. Vérifiez le backend et CORS.`);
            }
            const data = await response.json();
            setClients(data); 
        } catch (err) {
            console.error("Erreur de récupération des clients:", err);
            setError("Erreur: Impossible de charger la liste. Vérifiez le Backend.");
        } finally {
            setLoading(false);
        }
    };
    
    // [Logique de Suppression (DELETE) inchangée]
    const deleteClient = async (clientCin) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le client CIN ${clientCin} ?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${clientCin}`, { method: 'DELETE' });
            if (response.ok || response.status === 204) {
                setClients(clients.filter(client => client.cin !== clientCin));
            } else {
                throw new Error(`Échec de la suppression : ${response.status}`);
            }
        } catch (err) {
            console.error("Erreur de suppression :", err);
            setError(`Erreur lors de la suppression du client ${clientCin}.`);
        }
    };

    // 💡 NOUVEAU: Logique de Filtrage
    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredClients = useMemo(() => {
        if (!searchTerm) return clients;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return clients.filter(client => (
            (client.cin && client.cin.toLowerCase().includes(lowerCaseSearch)) ||
            (client.nom && client.nom.toLowerCase().includes(lowerCaseSearch)) ||
            (client.prenom && client.prenom.toLowerCase().includes(lowerCaseSearch))
        ));
    }, [clients, searchTerm]);

    useEffect(() => {
        fetchClients();
    }, []); 

    // Affichage des états de chargement/erreur (mise à jour de la classe)
    if (loading) {
        return <div className="client-list-container">Chargement des clients...</div>;
    }

    if (error) {
        return <div className="client-list-container error-message" style={{color: 'red', textAlign: 'center'}}>{error}</div>;
    }


    return (
        <div className="client-list-container"> {/* ⬅️ Classe unifiée */}
            <div className="header-section">
                <div>
                    <h2 className="module-title">MODULE LISTE DES CLIENTS</h2> {/* ⬅️ Classe unifiée */}
                    <p className="content-zone">Total de clients : {clients.length} (Affichés: {filteredClients.length})</p>
                </div>
                <button className="btn btn-refresh" onClick={fetchClients} title="Actualiser">
                    🔄 Actualiser
                </button>
            </div>

            <div className="table-container">
                <table className="table-data"> {/* ⬅️ Classe unifiée */}
                    <thead>
                        {/* ... (En-têtes de colonnes inchangés) */}
                        <tr>
                            <th>CIN</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Ville</th>
                            <th>Rue</th>
                            <th>Tél.</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 💡 Utilisation de filteredClients */}
                        {filteredClients.length > 0 ? filteredClients.map((client) => (
                            <tr key={client.cin}> 
                                <td>{client.cin}</td> 
                                <td>{client.nom}</td>
                                <td>{client.prenom}</td> 
                                <td>{client.ville}</td>
                                <td>{client.rue}</td>
                                <td>{client.telephone}</td>
                                <td>{client.email}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button className="btn-edit" onClick={() => onEditClient(client)}>
                                        🖊️ Modifier
                                    </button>
                                    <button className="btn-delete-row" style={{marginLeft: '10px'}} onClick={() => deleteClient(client.cin)}>
                                        🗑️ Supprimer
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                                    {searchTerm ? `Aucun client trouvé pour "${searchTerm}".` : "Aucun client enregistré."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="action-buttons"> {/* ⬅️ Classe unifiée */}
                <button className="btn btn-add" onClick={onAddClient}>
                    <span>+</span> Ajouter un Client
                </button>
                
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Rechercher par CIN, Nom, Ville..."
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

export default ClientTable;