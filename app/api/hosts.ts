import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';

export const getHostDetail = async (id: number) => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/hosts/${id}`,
    method: 'GET',
  });
  return res.data.result;
};
