
// src/axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // URL del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
