import { create } from 'zustand';
import API from '../utils/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('acadrix_token') || null,
  isAuthenticated: !!localStorage.getItem('acadrix_token'),
  isLoading: true,
  error: null,

  // Register
  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await API.post('/auth/register', userData);

      localStorage.setItem('acadrix_token', data.token);
      localStorage.setItem('acadrix_refresh_token', data.refreshToken);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Login
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await API.post('/auth/login', credentials);

      if (data.requires2FA) {
        set({ isLoading: false });
        return { requires2FA: true, tempToken: data.tempToken };
      }

      localStorage.setItem('acadrix_token', data.token);
      localStorage.setItem('acadrix_refresh_token', data.refreshToken);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Verify 2FA
  verify2FA: async (tempToken, code) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await API.post('/auth/verify-2fa', { tempToken, code });

      localStorage.setItem('acadrix_token', data.token);
      localStorage.setItem('acadrix_refresh_token', data.refreshToken);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || '2FA verification failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Get current user
  loadUser: async () => {
    try {
      const token = localStorage.getItem('acadrix_token');
      if (!token) {
        set({ isLoading: false, isAuthenticated: false });
        return;
      }

      set({ isLoading: true });
      const { data } = await API.get('/auth/me');

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      localStorage.removeItem('acadrix_token');
      localStorage.removeItem('acadrix_refresh_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Update profile
  updateProfile: async (updates) => {
    try {
      const { data } = await API.put('/auth/profile', updates);
      set({ user: data.user });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Update failed');
    }
  },

  // Logout
  logout: async () => {
    try {
      await API.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('acadrix_token');
    localStorage.removeItem('acadrix_refresh_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
