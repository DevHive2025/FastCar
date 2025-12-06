import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CarList from './components/CarList';
import Facture from './components/FactureListe';
import ContratList from './components/ContratList';
import ClientTable from './components/clientPage';
import AgentTable from './components/AgentPage';
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';

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
            <Route path="/cars" element={<CarList />} />
            <Route path="/clients" element={<ClientTable />} />
            <Route path="/agents" element={<AgentTable />} />
            <Route path="/contrats" element={<ContratList />} />
            <Route path="/facture/*" element={<Facture />} /> {/* Note: Facture avec ses propres routes internes */}
            <Route path="/settings" element={<div className="content-placeholder">Paramètres - À venir</div>} />
            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
