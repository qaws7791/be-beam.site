import type { meetingReviewFilterType } from '@/components/sections/MeetingDetailMeetingReviewsContainer';
import { API_V2_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { type AxiosRequestConfig } from 'axios';

export const getMeetingReviews = async (
  meetingId: number,
  filters: meetingReviewFilterType,
  pageParam: number = 0,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const res = await axiosInstance({
    baseURL: API_V2_BASE_URL,
    method: 'GET',
    url: `/meetings/${meetingId}/reviews?sort=${filters.sort}&type=${filters.type}&rating=${filters.rating}&&cursor=${pageParam}&size=12`,
    ...axiosRequestConfig,
  });
  const data = res.data;
  return data.result;
};
