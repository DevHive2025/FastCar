
import { carAPI } from '../services/api';
import './CarList.css';

function CarList (){

  return (
    <div className="car-list-container">
      <div className="header-section">
        <div>
          <h2 className="module-title">MODULE LISTE DES VOITURES</h2>
          <p className="content-zone">ZONE DE CONTENU</p>
        </div>
        <button className="btn btn-refresh"  title="Actualiser">
          🔄 Actualiser
        </button>
      </div>

      <div className="table-container">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Marque</th>
              <th>Prix/jour</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="btn btn-add" >
          <span>+</span> Ajouter
        </button>
        <button className="btn btn-delete" >
          🗑️ Supprimer
        </button>
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    </div>
  );
};

export default CarList;

