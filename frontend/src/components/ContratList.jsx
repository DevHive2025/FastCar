
import { contratAPI } from '../services/api';
import { useState, useEffect } from 'react';
import './Lists.css';
import { FaTrash , FaPlus, FaSearch, FaSyncAlt, FaEdit, FaPrint} from 'react-icons/fa';
import {FiSave} from 'react-icons/fi';


function ContratList (){
    const [contrats, setContrats] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    const fetchContrats = async () => {
        try {
            const response = await contratAPI.getAll();
            setContrats(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des contrats:", error);
        }
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    return (
        <div className="container">
        <div className="header-section">
            <div>
            <h2 className="module-title">LISTE DES CONTRATS ENREGESTRE</h2>
            </div>
            <button className="btn btn-refresh"  title="Actualiser" onClick={fetchContrats}>
                    <FaSyncAlt size={20} /> Actualiser
            </button>
        </div>

        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                    <th>N Contrat</th>
                    <th>Cilent (CIN)</th>
                    <th>Voiture (Matricule)</th>
                    <th>Periode (Debut-Fin)</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contrats
                        .filter(c => 
                        c.numContrat.toLowerCase().includes(search.toLowerCase())||
                        c.client.cin.toLowerCase().includes(search.toLowerCase()) || 
                        c.car.matricule.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((contrat) => (
                        <tr key={contrat.numContrat}>
                            <td>{contrat.numContrat}</td>
                            <td>{contrat.client.cin}</td>
                            <td>{contrat.car.matricule}</td>
                            <td>{contrat.dateDebut} - {contrat.dateFin}</td>
                            <td className='action-icons'>
                                <FaPrint size={20} /> 
                                <FaEdit size={20} />
                                <FaTrash size={20} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="action-buttons">
            <button className="btn btn-add" onClick={() => setShowForm(true)} >
            <FaPlus size={20} /> Ajouter
            </button>
            <button className="btn btn-delete" >
            <FaTrash size={20} /> Supprimer
            </button>
            <div className="search-box">
            <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="search-icon" size={20}/>
            </div>
        </div>
        {showForm && (
            <div className="modal-overlay">
                <div className="modal-content">
                <h3>Ajouter un nouveau contrat</h3>

                <form className="form-contrat">
                    <label>Numéro Contrat :</label>
                    <input type="text" />

                    <label>CIN Client :</label>
                    <input type="text" />

                    <label>Matricule Voiture :</label>
                    <input type="text" />

                    <label>Date Début :</label>
                    <input type="date" />

                    <label>Date Fin :</label>
                    <input type="date" />

                    <div className="modal-actions">
                    <button className="btn" type="submit"><FiSave />Enregistrer</button>
                    <button className="btn btn-delete" onClick={() => setShowForm(false)}>
                        Annuler
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )}


        </div>
    );
};

export default ContratList;

