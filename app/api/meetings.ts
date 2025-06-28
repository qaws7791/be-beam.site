// import { axiosInstance } from '@/lib/axios';

import axios from 'axios';

export const getMeetingList = async (
  search: string = '',
  selectedTopic: string = 'all',
  selectedFilters: Record<string, string> = {
    '모임 방식': 'all',
    '모임 유형': 'all',
    '모집 상태': 'all',
    정렬: 'recent',
    참가비: 'all',
  },
  pageParam: number = 0,
) => {
  const res = await axios({
    method: 'get',
    url: `/api/web/v2/meetings?search=${search}&topic=${selectedTopic}&recruitment-type=${selectedFilters['모임 유형']}&recruitment-status=${selectedFilters['모집 상태']}&mode=${selectedFilters['모임 방식']}&cost=${selectedFilters['참가비']}&sort=${selectedFilters['정렬']}&cursor=${pageParam}&size=12`,
  });
  const data = res.data;
  return data.result;
};

export const getMeetingDetail = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: `/api/web/v2/meetings/${id}`,
  });
  const data = res.data;
  return data.result;
};
