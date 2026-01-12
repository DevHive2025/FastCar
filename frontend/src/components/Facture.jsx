import { useFetchcontrats } from '../services/fetch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FactureList from './FactureList';
import FactureDetail from './FactureDetail';

function Facture() {
  const { contrats } = useFetchcontrats();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FactureList contrats={contrats} />} />
        <Route path="/:numContrat" element={<FactureDetail contrats={contrats} />} />
      </Routes>
    </Router>
  );
}

export default Facture;
