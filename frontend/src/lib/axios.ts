import axios from 'axios';

// Point to Next.js internal API (proxy to Express backend)
export const apiClient = axios.create({
  baseURL: '/api/backend',
});

export default apiClient;
