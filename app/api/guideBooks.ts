import { API_V1_BASE_URL } from '@/constants/api';
import type { useGuideBooksParamsType } from '@/hooks/business/useGuideBooksParams';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';
import type { Guidebook } from '@/types/entities';
import axios from 'axios';

export type GuideBookListResult = {
  pageInfo: {
    nextCursor: number;
    size: number;
    hasNext: boolean;
  };
  guideBooks: {
    id: Guidebook['id'];
    title: Guidebook['title'];
    image: Guidebook['image'];
    description: Guidebook['description'];
  }[];
};

export const getGuideBookList = async (
  params: useGuideBooksParamsType['params'],
  pageParam: number = 0,
) => {
  // const res = await axiosInstanceV1({
  //   method: 'GET',
  //   url: `guidebooks?type=${type}&target-type=${filter.targetType}&level=${filter.level}&time=${filter.time}&cursor=0&size=9`,
  // });

  const res = await axios<APIResponse<GuideBookListResult>>({
    method: 'GET',
    url: `/api/web/v1/guidbooks?type=${params.type}&target-type=${params.targetType}&level=${params.level}&time=${params.time}&cursor=${pageParam}&size=9`,
  });
  const data = res.data;
  return data.result;
};

export type GuideBookDetailResult = {
  id: Guidebook['id'];
  guidebookType: Guidebook['guidebookType'];
  title: Guidebook['title'];
  description: Guidebook['description'];
  image: Guidebook['image'];
  hashtags: Guidebook['hashtags'];
  level: Guidebook['level'];
  targetType: Guidebook['targetType'];
  time: Guidebook['time'];
  benefits: Guidebook['benefits'];
  file: Guidebook['file'];
  recommendations: Guidebook['recommendations'];
}[];

export const getGuideBookDetail = async (id: number) => {
  const res = await axiosInstance<APIResponse<GuideBookDetailResult>>({
    baseURL: API_V1_BASE_URL,
    url: `/guidebooks/${id}`,
    method: 'GET',
  });
  const data = res.data;
  return data.result;
};
