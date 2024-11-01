// api.js
import axios, { AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios';
import { navigateTo } from './navigationHelper';

export const apiUrl = process.env.REACT_APP_API_URL
const api = axios.create({
  baseURL: `${apiUrl}`, // Your backend URL
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = Cookies.get('token');

    const token = JSON.parse(localStorage.getItem('accessToken') || 'null');  
  
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;

    }
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${apiUrl}/api/v1/userrefresh`,{refreshToken});
        const newToken = response.data.accessToken;

        localStorage.setItem('accessToken', JSON.stringify(newToken));
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigateTo("/signin");
      }
    }
    return Promise.reject(error);
  }
);

 export default api;
