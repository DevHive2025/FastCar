import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createAPI = (resource) => ({
  getAll: () => api.get(`/${resource}`),
  getById: (id) => api.get(`/${resource}/${id}`),
  create: (data) => api.post(`/${resource}`, data),
  update: (id, data) => api.put(`/${resource}/${id}`, data),
  delete: (id) => api.delete(`/${resource}/${id}`),
});

export const carAPI = createAPI('cars');
export const agentAPI = createAPI('agents');
export const clientAPI = createAPI('clients');
export const contratAPI = createAPI('contrats');
