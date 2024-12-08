import type { AxiosInstance } from 'axios';

import axios from 'axios';

import { getAccessToken, getRefreshToken } from 'src/utils/local-storage';

import { API_BASE_URL } from './global';

type HttpClient = {
  get: AxiosInstance['get'];
  post: AxiosInstance['post'];
  delete: AxiosInstance['delete'];
  put: AxiosInstance['put'];
  patch: AxiosInstance['patch'];
};

const app: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('Refresh token is missing');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/Account/refresh?refreshToken=${refreshToken}`
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    if (accessToken) {
      localStorage.setItem('access', accessToken);
    }

    if (newRefreshToken) {
      localStorage.setItem('refresh', newRefreshToken);
    }
    return accessToken;
  } catch (error) {
    console.error('Refresh token failed:', error);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/signin';
    throw new Error('Unable to refresh access token');
  }
}

app.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Original request:', originalRequest);

    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log('Retrying original request...');
        return await axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const http: HttpClient = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};
export default http;
