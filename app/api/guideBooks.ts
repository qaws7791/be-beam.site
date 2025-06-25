import type { useGuideBooksParamsType } from '@/hooks/business/useGuideBooksParams';
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
