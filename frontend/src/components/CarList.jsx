import {useFetchcontrats,useFetchcars} from '../services/fetch'
import { useState, useEffect } from 'react';
import './Lists.css';
import { FaTrash , FaPlus, FaSearch, FaSyncAlt, FaEdit, FaPrint} from 'react-icons/fa';
function CarList (){
    const {car} = useFetchcars();
    const {contrats} = useFetchcontrats();
    const [search, setSearch] = useState("");
    const aujourdhuiYYYYMMDD = new Date().toISOString().split('T')[0];

    const dispon = (matricule)=> {
      if(!contrats||contrats.length === 0)return false;

      const contratActife = contrats.find(c =>
        c.car?.matricule === matricule && new Date( c.dateFin)>new Date(aujourdhuiYYYYMMDD)
      )
      
      return !!contratActife
    }
return (
        <div className="container">
        <div className="header-section">
            <div>
            <h2 className="module-title">LISTE DES CARS ENREGESTRE</h2>
            </div>
            {/* <button className="btn btn-refresh"  title="Actualiser" onClick={}>
                    <FaSyncAlt size={20} /> Actualiser
            </button> */}
        </div>
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                    <th>Matricule</th>
                    <th>Marque</th>
                    <th>Prix Journalier</th>
                    <th>Etat </th> 
                    </tr>
                </thead>
                <tbody>
                    {car
                        .filter(c => 
                        c.matricule.toLowerCase().includes(search.toLowerCase())||
                        c.marque.toLowerCase().includes(search.toLowerCase()) || 
                        c.modele.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((car) => (
                        <tr key={car.matricule}>
                            <td>{car.matricule}</td>
                            <td>{car.marque}</td>
                            <td>{car.prix}</td>
                            <td>{dispon(car.matricule) ? 'Louée' : 'Disponible'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="action-buttons">
            <button className="btn btn-add" >
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
        </div>
    );
};


export default CarList;

