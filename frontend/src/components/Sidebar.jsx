import React from 'react';
import './Sidebar.css';
import { FaFileContract , FaCar, FaUsers, FaUserTie, FaPrint, FaCog, FaSignOutAlt} from 'react-icons/fa';

const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'cars', label: 'Gérer les Voitures', icon: <FaCar size={20} /> },
    { id: 'clients', label: 'Gérer les Clients', icon: <FaUsers size={20} /> },
    { id: 'agents', label: 'Gérer les Agents', icon: <FaUserTie size={20} /> },
    { id: 'contrats', label: 'Gérer les Contrats', icon: <FaFileContract size={20} />},
    { id: 'invoice', label: 'Imprimer une Facture', icon: <FaPrint size={20} /> },
    { id: 'settings', label: 'Paramètres', icon: <FaCog size={20} /> },
    { id: 'logout', label: 'Déconnexion', icon: <FaSignOutAlt size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>MENU PRINCIPAL</h3>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => onMenuChange(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

