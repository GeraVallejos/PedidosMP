import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Variable para evitar múltiples solicitudes de refresh token
let isRefreshing = false;
let failedRequestsQueue = [];

// Interceptor de solicitudes (añade token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas (manejo de errores y refresh token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Manejo específico para error 401 (No autorizado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/token/')) {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        // Si ya se está refrescando el token, ponemos la solicitud en cola
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Sin refresh token disponible');
        }

        // Solicitar nuevo access token
        const response = await api.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        // Actualizar el header de autorización
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Reintentar la solicitud original
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Procesar todas las solicitudes en cola
        failedRequestsQueue.forEach(pending => pending.resolve());
        failedRequestsQueue = [];
        
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        
        // Rechazar todas las solicitudes en cola
        failedRequestsQueue.forEach(pending => pending.reject(refreshError));
        failedRequestsQueue = [];
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Manejo de otros errores comunes
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Error 400: Solicitud incorrecta', error.response.data);
          break;
        case 403:
          console.error('Error 403: No tienes permisos', error.response.data);
          window.location.href = '/unauthorized';
          break;
        case 404:
          console.error('Error 404: Recurso no encontrado', error.response.data);
          break;
        case 500:
          console.error('Error 500: Error del servidor', error.response.data);
          break;
        default:
          console.error(`Error ${error.response.status}:`, error.response.data);
      }
    } else if (error.request) {
      console.error('Error de red:', error.message);
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;