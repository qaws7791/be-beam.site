import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';
import type { AxiosRequestConfig } from 'axios';

export const getHostDetail = async (
  id: number,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/hosts/${id}`,
    method: 'GET',
    ...axiosRequestConfig,
  });
  return res.data.result;
};
