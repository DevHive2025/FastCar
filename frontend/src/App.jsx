import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CarPage from './components/CarPage';
import Facture from './components/FactureListe';
import ContratPage from './components/ContratPage';
import ClientPage from './components/ClientPage';
import AgentPage from './components/AgentPage';
import { Routes, Route, Navigate} from 'react-router-dom';

function App() {


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FASTCAR LOCATION - Gestion Centrale</h1>
      </header>
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/cars" replace />} />
            <Route path="/cars" element={<CarPage />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/agents" element={<AgentPage />} />
            <Route path="/contrats" element={<ContratPage />} />
            <Route path="/facture/*" element={<Facture />} /> {/* Note: Facture avec ses propres routes internes */}
            <Route path="/settings" element={<div className="content-placeholder">Paramètres - À venir</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
