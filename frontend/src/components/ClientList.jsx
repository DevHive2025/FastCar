import React, { useState, useEffect } from 'react';// ClientList.jsx

import './ClientList.css';
import { carAPI } from '../services/api';
// Importez le CSS si vous en avez un pour le tableau


const API_URL = 'http://localhost:8080/api/clients'; // Endpoint Spring Boot

function ClientList({ onEdit, onDelete }) { // Renommage des props pour plus de clarté
    
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour charger la liste des clients depuis l'API
    const fetchClients = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                // Si la réponse n'est pas OK (404, 500, etc.)
                throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            setClients(data); // Met à jour l'état avec la liste des clients
            
        } catch (err) {
            console.error("Erreur de récupération des clients:", err);
            setError("Erreur de chargement. Vérifiez que le Backend est démarré et le port est correct.");
        } finally {
            setLoading(false);
        }
    };

    // Exécute la fonction de chargement une seule fois au montage du composant
    useEffect(() => {
        fetchClients();
    }, []); 

    // Affichage conditionnel
    if (loading) {
        return <div>Chargement des clients...</div>;
    }

    if (error) {
        return <div style={{color: 'red'}}>Erreur : {error}</div>;
    }

    return (
        <div className="client-list-container">
            <div className="header-section">
                <h3>Liste des Clients Enregistrés</h3>
                {/* Bouton pour rafraîchir la liste manuellement */}
                <button className="btn btn-refresh" onClick={fetchClients} title="Actualiser">
                    🔄 Actualiser
                </button>
            </div>

            <div className="table-container">
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>CIN</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Rue</th>
                            <th>Ville</th>
                            <th>Tél.</th>
                            <th>Email</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affichage dynamique des lignes de la table */}
                        {clients.map((client) => (
                            <tr key={client.cin}>
                                <td>{client.cin}</td>
                                <td>{client.nom}</td>
                                <td>{client.prenom}</td>
                                <td>{client.rue}</td>
                                <td>{client.ville}</td>
                                <td>{client.telephone}</td>
                                <td>{client.email}</td>
                                <td>
                                    <button onClick={() => onEdit(client)}>🖊️ Modifier</button>
                                    <button onClick={() => onDelete(client.cin)} style={{marginLeft: '10px'}}>🗑️ Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        {/* Message si la liste est vide */}
                        {clients.length === 0 && (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Aucun client n'a été trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientList;