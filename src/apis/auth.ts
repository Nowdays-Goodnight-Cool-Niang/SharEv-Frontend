import axios from 'axios';

export const authInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

export const authAPI = {
  logout: async () => {
    const response = await authInstance.get('/logout');
    return response.data;
  },
};
