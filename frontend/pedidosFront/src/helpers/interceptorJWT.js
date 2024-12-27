import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o no autorizado
      localStorage.removeItem('accessToken'); // Limpiar el token almacenado
      window.location.href = '/login'; // Redirigir a la página de login
    }
    return Promise.reject(error);
  }
);

export default api;