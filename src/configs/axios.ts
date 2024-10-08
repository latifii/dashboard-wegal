import axios from 'axios';

import store from 'src/store/store';
import { setErrors } from 'src/store/slices/errorSlice';

import { API_BASE_URL } from './global';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
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

export default axiosInstance;
