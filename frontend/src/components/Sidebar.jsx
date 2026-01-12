import React from 'react';
import './Sidebar.css';
import { FaFileContract , FaCar, FaUsers, FaUserTie, FaPrint, FaCog, FaSignOutAlt} from 'react-icons/fa';
import {NavLink,useNavigate} from 'react-router-dom'
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'cars', label: 'Gérer les Voitures', icon: <FaCar size={20} /> ,path: '/cars'},
    { id: 'clients', label: 'Gérer les Clients', icon: <FaUsers size={20} /> ,path: '/clients'},
    { id: 'agents', label: 'Gérer les Agents', icon: <FaUserTie size={20} /> ,path: '/agents'},
    { id: 'contrats', label: 'Gérer les Contrats', icon: <FaFileContract size={20} />,path: '/contrats'},
    { id: 'invoice', label: 'Imprimer une Facture', icon: <FaPrint size={20} />,path: '/facture' },
    { id: 'settings', label: 'Paramètres', icon: <FaCog size={20} />,path: '/settings' },
    { id: 'logout', label: 'Déconnexion', icon: <FaSignOutAlt size={20} />,path: '/#' },
  ];
    const handleMenuItemClick = (itemId, itemPath) => {
    if (itemId === 'logout') {
      if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
        onMenuChange(itemId);

      }
    } else {
      onMenuChange(itemId);
      navigate(itemPath);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>MENU PRINCIPAL</h3>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={(e) => {
              if (item.id === 'logout') {
                e.preventDefault();
                handleMenuItemClick(item.id, item.path);
              }
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;