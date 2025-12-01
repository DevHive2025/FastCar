import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CarList from './components/CarList';
import ContratList from './components/ContratList';

function App() {
  const [activeMenu, setActiveMenu] = useState('cars');

  const handleMenuChange = (menuId) => {
    if (menuId === 'logout') {
      if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
        // Handle logout logic here
        console.log('Logout');
      }
    } else {
      setActiveMenu(menuId);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'cars':
        return <CarList />;
      case 'clients':
        return <div className="content-placeholder">Gérer les Clients - À venir</div>;
      case 'agents':
        return <div className="content-placeholder">Gérer les Agents - À venir</div>;
      case 'contrats':
        return <ContratList />;
      case 'invoice':
        return <div className="content-placeholder">Imprimer une Facture - À venir</div>;
      case 'settings':
        return <div className="content-placeholder">Paramètres - À venir</div>;
      default:
        return <CarList />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FASTCAR LOCATION - Gestion Centrale</h1>
      </header>
      <div className="app-body">
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
