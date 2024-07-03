/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { toast } from 'react-toastify';

function responseInterceptorFunction(response: any): any {
  return response;
}

// get expire date form token and check if token is expired
function checkIfTokenExpired() {
  const accessToken: string = localStorage.getItem('token') || '';
  const stringData = atob(accessToken.split('.')[1]);
  const stringDate = Number(JSON.parse(stringData)?.exp) * 1000;
  const expireDateTime = new Date(stringDate);
  const currentDateTime = new Date();
  return currentDateTime >= expireDateTime;
}

function responseInterceptorErrorFunction(error: any) {
  const originalRequest = error.config;

  const refreshToken = localStorage.getItem('refresh');
  if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
    try {
      if (checkIfTokenExpired()) {
        originalRequest._retry = true;

        return axios
          .post(`${process.env.API_URL}/user/token/refresh/`, { refresh: refreshToken })
          .then((response) => {
            const newToken = response.data.access;
            localStorage.setItem('token', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          })
          .catch((err: any) => {
            toast.error('Session Expired. Please Re-login.');
            window.location.href = '/sign-in';
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            return Promise.reject(err);
          });
      }
      return Promise.reject(error);
    } catch (err) {
      return axios.post(`${process.env.API_URL}/user/token/refresh/`, { refresh: refreshToken }).then((response) => {
        const newToken = response.data.access;
        localStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      });
    }

    // originalRequest._retry = true;
    // const refreshToken = localStorage.getItem('refresh');

    // return axios
    //   .post(`${process.env.API_URL}/user/token/refresh/`, { refresh: refreshToken })
    //   .then((response) => {
    //     const newToken = response.data.access;
    //     localStorage.setItem('token', newToken);
    //     originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //     return axios(originalRequest);
    //   })
    //   .catch((err: any) => {
    //     toast.error('Session Expired. Please Re-login.');
    //     window.location.href = '/sign-in';
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('refresh');
    //     return Promise.reject(err);
    //   });
  }

  return Promise.reject(error);
}

// This interceptor is required to set token on request
function requestInterceptorFunction(config: any): any {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}
/* This code is creating an instance of the Axios library with default headers and timeout settings.
The `api` instance can be used to make HTTP requests to an API that accepts JSON data. */
export const api = axios.create({
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* `export const authenticatedApi` is creating an instance of the Axios library with default headers
and timeout settings, but with an additional `Authorization` header that includes a token. This
instance can be used to make HTTP requests to an API that requires authentication. The `token`
variable is retrieved from the `localStorage` and is used to authenticate the user. */
export const authenticatedApi = axios.create({
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Token ${token}`,
    Authorization: `Token 31244a003812bf8f43dc385e66597019a94c3605`,
  },
});

export const authenticatedFormDataApi = axios.create({
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Token 31244a003812bf8f43dc385e66597019a94c3605`,
  },
});

export const formDataApi = axios.create({
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

authenticatedFormDataApi.interceptors.request.use(requestInterceptorFunction);
authenticatedApi.interceptors.request.use(requestInterceptorFunction);
authenticatedFormDataApi.interceptors.response.use(responseInterceptorFunction, responseInterceptorErrorFunction);
authenticatedApi.interceptors.response.use(responseInterceptorFunction, responseInterceptorErrorFunction);
