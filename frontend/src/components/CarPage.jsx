import { useState } from 'react';
import { FaTrash, FaPlus, FaSearch, FaEdit } from 'react-icons/fa';
import { useFetchcontrats, useCars } from '../services/fetch';
import CarModal from './CarModal';
import './Lists.css';

function CarPage() {
  const { cars, loading, error, fetchCars, addCar, updateCar, deleteCar } = useCars();
  const { contrats } = useFetchcontrats();
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    matricule: "",
    marque: "",
    modele: "",
    prix: "",
    etat : "",
    kilometrage : ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const aujourdhuiYYYYMMDD = new Date().toISOString().split('T')[0];

  const getEtat = (matricule) => {
    const contratActif = contrats.find(c =>
      c.car?.matricule === matricule && new Date(c.dateFin) >= new Date(aujourdhuiYYYYMMDD)
    );
    return contratActif ? 'Louée' : 'Disponible';
  };

  const handleAddClick = () => {
    setModalData({ matricule: "", marque: "", modele: "", prix: "", etat : "", kilometrage : "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (car) => {
    setModalData({ ...car });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateCar(modalData.matricule, modalData);
    else await addCar(modalData);
    setShowModal(false);
    fetchCars();
  };

  const handleDelete = async (matricule) => {
    if (window.confirm(`Voulez-vous supprimer la voiture ${matricule} ?`)) {
      await deleteCar(matricule);
      fetchCars(); // إعادة تحميل البيانات بعد الحذف
    }
  };

  const filteredCars = cars.filter(c =>
    c.matricule?.toLowerCase().includes(search.toLowerCase()) ||
    c.marque?.toLowerCase().includes(search.toLowerCase()) ||
    c.modele?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header-section">
        <h2 className="module-title">LISTE DES VOITURES</h2>
      </div>

      {error && <div className="error">{error.message}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Prix Journalier</th>
              <th>État</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map(c => (
              <tr key={c.matricule}>
                <td>{c.matricule}</td>
                <td>{c.marque}</td>
                <td>{c.modele}</td>
                <td>{c.prix} MAD</td>
                <td>
                    <span className={`status-badge ${getEtat(c.matricule)}`}>
                        {getEtat(c.matricule)}
                    </span>
                </td>
                <td className="action-icons">
                  <FaEdit size={18} onClick={() => handleEditClick(c)} title="Modifier" />
                  <FaTrash size={18} onClick={() => handleDelete(c.matricule)} title="Supprimer" />
                </td>
              </tr>
            ))}
            {filteredCars.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>
                  Aucune voiture trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="btn btn-add" onClick={handleAddClick}>
          <FaPlus size={20} /> Ajouter
        </button>

        <p className="content-zone">Total des voitures : {cars.length}</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="search-icon" size={20} />
        </div>
      </div>

      {showModal && (
        <CarModal
          show={showModal}
          onClose={() => setShowModal(false)}
          data={modalData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default CarPage;
