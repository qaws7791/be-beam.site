// import { axiosInstance } from '@/lib/axios';

import axios from 'axios';

export const getMeetingReviews = async (
  meetingId: number,
  sort: string,
  type: string,
  rating: string | number,
  pageParam: number = 0,
) => {
  const res = await axios({
    method: 'get',
    url: `/api/web/v2/meetings/${meetingId}/reviews?sort=${sort}&type=${type}&rating=${rating}&cursor=${pageParam}&size=12`,
  });
  const data = res.data;
  return data.result;
};
