import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';

export const getBanner = async () => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: '/home/banners',
    method: 'GET',
  });
  return res.data.result;
};

export const getRecommendationMeeting = async (topic: string, type: string) => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/home/${topic}-meetings?type=${type}`,
    method: 'GET',
  });
  return res.data.result;
};
