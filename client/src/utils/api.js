import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('acadrix_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('acadrix_refresh_token');
        if (refreshToken) {
          const { data } = await axios.post('/api/auth/refresh-token', {
            refreshToken,
          });

          localStorage.setItem('acadrix_token', data.token);
          localStorage.setItem('acadrix_refresh_token', data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('acadrix_token');
        localStorage.removeItem('acadrix_refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
