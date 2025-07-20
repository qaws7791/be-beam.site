import { API_V1_BASE_URL } from '@/constants/api';
import type { useGuideBooksParamsType } from '@/hooks/business/useGuideBooksParams';
import { axiosInstance } from '@/lib/axios';
import axios from 'axios';

export const getGuideBookList = async (
  params: useGuideBooksParamsType['params'],
  pageParam: number = 0,
) => {
  // const res = await axiosInstanceV1({
  //   method: 'GET',
  //   url: `guidebooks?type=${type}&target-type=${filter.targetType}&level=${filter.level}&time=${filter.time}&cursor=0&size=9`,
  // });

  const res = await axios({
    method: 'GET',
    url: `/api/web/v1/guidbooks?type=${params.type}&target-type=${params.targetType}&level=${params.level}&time=${params.time}&cursor=${pageParam}&size=9`,
  });
  const data = res.data;
  return data.result;
};

export const getGuideBookDetail = async (id: number) => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'GET',
    url: `/guidebooks/${id}`,
  });
  const data = res.data;
  return data.result;
};
