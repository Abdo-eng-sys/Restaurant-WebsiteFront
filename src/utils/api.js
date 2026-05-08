import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_URL || "https://restaurant-websiteback-production.up.railway.app/",
=======
  baseURL: process.env.REACT_APP_API_URL || 'https://royalrest.up.railway.app',
>>>>>>> 160fb83eac8245f36f15c675e2b6d44f8f850c01
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
// https://localhost:8000/ to run it local 