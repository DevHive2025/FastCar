import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'cars', label: 'Gérer les Voitures', icon: '🚗' },
    { id: 'clients', label: 'Gérer les Clients', icon: '👤' },
    { id: 'agents', label: 'Gérer les Agents', icon: '👥' },
    { id: 'contrats', label: 'Gérer les Contrats', icon: '📄' },
    { id: 'invoice', label: 'Imprimer une Facture', icon: '🖨️' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'logout', label: 'Déconnexion', icon: '🔌' },
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

