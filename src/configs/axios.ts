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
      `${API_BASE_URL}/Account/refresh?refreshToken=${refreshToken}`,
      {},
      {
        headers: {
          accept: 'text/plain',
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    console.log('response.data', response.data);
    console.log('response.data accessToken', response.data.accessToken);

    if (accessToken) {
      // ذخیره توکن جدید در localStorage
      localStorage.setItem('access', accessToken);
    }

    if (newRefreshToken) {
      // ذخیره refreshToken جدید در localStorage
      localStorage.setItem('refresh', newRefreshToken);
    }
    return accessToken;
  } catch (error) {
    console.error('Refresh token failed:', error);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/signin'; // هدایت به صفحه ورود در صورت خطا
    throw new Error('Unable to refresh access token');
  }
}

app.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      console.log('Adding token to request:', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('Original request:', originalRequest);

    // If error is 401 (Unauthorized) and token has expired, attempt to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        console.log('Retrying original request...');
        return await axios(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid or any error occurs, redirect to login
        console.error('Refresh failed:', refreshError);
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
