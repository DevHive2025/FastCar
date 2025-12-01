
import { carAPI } from '../services/api';
import './Lists.css';
import { FaTrash , FaPlus, FaSearch, FaSyncAlt} from 'react-icons/fa';

function CarList (){

  return (
    <div className="container">
      <div className="header-section">
        <div>
          <h2 className="module-title">LISTE DES VOITURES</h2>
        </div>
        <button className="btn btn-refresh"  title="Actualiser">
          <FaSyncAlt /> Actualiser
        </button>
      </div>

      <div className="table-container">
        <table className="table">
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
          <FaPlus /> Ajouter
        </button>
        <button className="btn btn-delete" >
          <FaTrash /> Supprimer
        </button>
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default CarList;

