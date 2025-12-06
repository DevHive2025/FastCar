import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CarPage from './components/CarPage';
import Facture from './components/FactureListe';
import ContratPage from './components/ContratPage';
import ClientPage from './components/ClientPage';
import AgentPage from './components/AgentPage';

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
        return <CarPage />;
      case 'clients':
        return <ClientPage/>;
      case 'agents':
        return <AgentPage/>;
      case 'contrats':
        return <ContratPage />;
      case 'invoice':
        return <Facture/> ;
      case 'settings':
        return <div className="content-placeholder">Paramètres - À venir</div>;
      default:
        return <CarPage/>;
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
