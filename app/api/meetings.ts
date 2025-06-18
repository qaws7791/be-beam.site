import { axiosInstance } from '@/lib/axios';

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
) => {
  const res = await axiosInstance({
    method: 'get',
    url: `/meetings?search=${search}&topic=${selectedTopic}&meeting-type=${selectedFilters['모임 유형']}&recruitment-type=${selectedFilters['모집 상태']}&mode=${selectedFilters['모임 방식']}&cost=${selectedFilters['참가비']}&sort=${selectedFilters['정렬']}&cursor=0&size=12`,
  });
  const data = res.data;
  console.log(res);
  return data.result;
};
