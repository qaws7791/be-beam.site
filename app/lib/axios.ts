import {
  ACCESS_TOKEN_COOKIE_NAME,
  API_V1_BASE_URL,
  API_V2_BASE_URL,
} from '@/constants/api';
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

/**
 * 저장된 JWT 토큰을 가져옴
 * @returns JWT 토큰 또는 undefined
 */
export const getAuthToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  }
};

/**
 * 저장된 모든 인증 토큰 제거
 */
export const clearAuthTokens = (): void => {
  if (typeof window !== 'undefined') {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
  }
};

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_V2_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosInstanceV1 = axios.create({
  baseURL: API_V1_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  if (response.status === 401) {
    clearAuthTokens();
    window.location.href = '/login';
  }
  return response;
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

axiosInstanceV1.interceptors.request.use(requestInterceptor);
axiosInstanceV1.interceptors.response.use(responseInterceptor);
