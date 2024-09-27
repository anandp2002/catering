import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set, get) => {
  // Function to set up a token refresh interval
  const startTokenRefresh = () => {
    setInterval(async () => {
      try {
        await get().refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
  };

  return {
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
      set({ loading: true });

      if (password !== confirmPassword) {
        set({ loading: false });
        return toast.error('Passwords do not match');
      }

      try {
        const res = await axios.post('/auth/signup', { name, email, password });
        set({ user: res.data, loading: false });
      } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.message || 'An error occurred');
      }
    },
    login: async (email, password) => {
      set({ loading: true });

      try {
        const res = await axios.post('/auth/login', { email, password });
        set({ user: res.data, loading: false });

        // Start token refresh interval on login
        startTokenRefresh();
      } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.message || 'An error occurred');
      }
    },

    logout: async () => {
      try {
        await axios.post('/auth/logout');
        set({ user: null });
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'An error occurred during logout'
        );
      }
    },

    checkAuth: async () => {
      set({ checkingAuth: true });
      try {
        const response = await axios.get('/auth/profile');
        set({ user: response.data, checkingAuth: false });

        // Start token refresh interval on successful auth check
        startTokenRefresh();
      } catch (error) {
        console.log(error.message);
        set({ checkingAuth: false, user: null });
      }
    },

    refreshToken: async () => {
      // Prevent multiple simultaneous refresh attempts
      if (get().checkingAuth) return;

      set({ checkingAuth: true });
      try {
        const response = await axios.post('/auth/refresh-token');
        set({ checkingAuth: false });

        return response.data;
      } catch (error) {
        set({ user: null, checkingAuth: false });
        throw error;
      }
    },
  };
});
