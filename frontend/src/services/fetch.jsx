import { useState, useEffect } from 'react';
import { contratAPI,carAPI, clientAPI, agentAPI } from './api';


export const useFetchcontrats = ()=>{
    const [contrats, setContrats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await contratAPI.getAll();
            setContrats(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des contrats:", error);
        }
    }
    fetchData();
    }, []);
    return{contrats};
}
//============================================================= 
// Contracts Hook
//=============================================================
export const useContrats = () => {
  const [contrats, setContrats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContrats = async () => {
    setLoading(true);
    try {
      const res = await contratAPI.getAll();
      setContrats(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const addContrat = async (data) => {
    setLoading(true);
    try {
      const res = await contratAPI.create(data);
      setContrats(prev => [...prev, res.data]); 
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteContrat = async (numContrat) => {
    setLoading(true);
    try {
      await contratAPI.delete(numContrat);
      setContrats(prev => prev.filter(c => c.numContrat !== numContrat));
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // تحديث عقد
  const updateContrat = async (id, data) => {
    setLoading(true);
    try {
      const res = await contratAPI.update(id, data);
      setContrats(prev => prev.map(c => c.id === id ? res.data : c));
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContrats();
  }, []);

  return { contrats, loading, error, fetchContrats, addContrat, deleteContrat, updateContrat };
};
export const useFetchcars = ()=>{
    const [car, setCar] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await carAPI.getAll();
            setCar(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des contrats:", error);
        }
    }
    fetchData();
    }, []);
    return{car};
}

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await carAPI.getAll(); // GET /cars
      setCars(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // إضافة سيارة جديدة
  const addCar = async (carData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await carAPI.create(carData); // POST /cars
      setCars(prev => [...prev, res.data]);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // تحديث سيارة
  const updateCar = async (matricule, carData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await carAPI.update(matricule, carData); // PUT /cars/:matricule
      setCars(prev => prev.map(c => (c.matricule === matricule ? res.data : c)));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // حذف سيارة
  const deleteCar = async (matricule) => {
    setLoading(true);
    setError(null);
    try {
      await carAPI.delete(matricule); // DELETE /cars/:matricule
      setCars(prev => prev.filter(c => c.matricule !== matricule));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, error, fetchCars, addCar, updateCar, deleteCar };
};

// Hook ديال العملاء
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- جلب الكليان ---
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await clientAPI.getAll();
      setClients(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // --- إضافة كليان ---
  const addClient = async (data) => {
    try {
      const res = await clientAPI.create(data);
      setClients((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // --- تعديل كليان ---
  const updateClient = async (id, data) => {
    try {
      const res = await clientAPI.update(id, data);
      setClients((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // --- حذف كليان ---
  const deleteClient = async (id) => {
    try {
      await clientAPI.delete(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    addClient,
    updateClient,
    deleteClient,
  };
}


export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =============================
  // 🔵 Fetch Agents
  // =============================
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await agentAPI.getAll();
      setAgents(res.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Erreur fetchAgents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // =============================
  // 🟢 Add Agent
  // =============================
  const addAgent = async (agent) => {
    try {
      const res = await agentAPI.create(agent);
      setAgents([...agents, res.data]);
      return res.data;
    } catch (err) {
      console.error("Erreur addAgent:", err);
      throw err;
    }
  };

  // =============================
  // 🟠 Update Agent
  // =============================
  const updateAgent = async (numAgent, agentData) => {
    try {
      const res = await agentAPI.update(numAgent, agentData);

      setAgents(
        agents.map((a) =>
          a.numAgent === numAgent ? res.data : a
        )
      );

      return res.data;
    } catch (err) {
      console.error("Erreur updateAgent:", err);
      throw err;
    }
  };

  // =============================
  // 🔴 Delete Agent
  // =============================
  const deleteAgent = async (numAgent) => {
    try {
      await agentAPI.delete(numAgent);

      setAgents(agents.filter((a) => a.numAgent !== numAgent));
    } catch (err) {
      console.error("Erreur deleteAgent:", err);
      throw err;
    }
  };

  // =============================
  // ⬅️ Return all tools
  // =============================
  return {
    agents,
    loading,
    error,
    fetchAgents,
    addAgent,
    updateAgent,
    deleteAgent,
  };
};

export default {useFetchcontrats,useFetchcars};  