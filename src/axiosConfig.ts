import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
