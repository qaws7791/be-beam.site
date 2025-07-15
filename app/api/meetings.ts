import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL, API_V2_BASE_URL } from '@/constants/api';

import type { MeetingListFilters } from '@/schemas/meetingFilters';
import { type AxiosRequestConfig } from 'axios';

export const getMeetingList = async (
  filters: MeetingListFilters,
  pageParam: number = 0,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const url = `/meetings?${searchParams.toString()}&cursor=${pageParam}&size=12`;
  console.log(url);

  const res = await axiosInstance({
    baseURL: API_V2_BASE_URL,
    url: url,
    method: 'GET',
    ...axiosRequestConfig,
  });

  return res.data.result;
};

export const getMeetingDetail = async (
  id: number,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const res = await axiosInstance({
    baseURL: API_V2_BASE_URL,
    url: `/meetings/${id}`,
    method: 'GET',
    ...axiosRequestConfig,
  });
  return res.data.result;
};

export const applyMeeting = async (
  id: number,
  data: { joinReason: string },
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    url: `/meetings/${id}/join`,
    data,
  });
};

export const likeMeeting = async (meeting: { id: number; liked: boolean }) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: meeting.liked ? 'DELETE' : 'POST',
    url: `/meetings/${meeting.id}/like`,
  });
};

export const cancelMeeting = (
  data: {
    reasonType: string;
    description: string;
  },
  id: number,
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    url: `/meetings/${id}/cancel`,
    data,
  });
};

export const breakawayMeeting = (id: number) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    // 아무 정보도 없어서 임시로 설정한 api 주소
    url: `/meetings/${id}/breakaway`,
  });
};
