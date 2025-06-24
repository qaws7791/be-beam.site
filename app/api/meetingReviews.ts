import { axiosInstance } from '@/lib/axios';

export const getMeetingReviews = async (
  meetingId: number,
  sort: string,
  type: string,
  rating: string | number,
  pageParam: number = 0,
) => {
  const res = await axiosInstance({
    method: 'get',
    url: `meetings/${meetingId}/reviews?sort=${sort}&type=${type}&rating=${rating}&cursor=${pageParam}&size=12`,
  });
  const data = res.data;
  return data.result;
};
