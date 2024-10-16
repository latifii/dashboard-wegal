import type { AxiosInstance } from 'axios';

import axios from 'axios';

import store from 'src/store/store';
import { setErrors } from 'src/store/slices/errorSlice';

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

app.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('API ERROR:', errorMessage);
    store.dispatch(setErrors(errorMessage));
    return Promise.reject(error);
  }
);

const http: HttpClient = {
  get: app.get,
  post: app.post,
  delete: app.post,
  put: app.put,
  patch: app.patch,
};
export default http;
