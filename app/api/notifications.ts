import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';

export type NotificationsResult = {
  alarms: {
    id: number;
    type: 'MEETING' | 'REVIEW' | 'HOST';
    message: string;
    timestamp: string;
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getNotifications = async ({
  type = 'all',
  page,
  size,
}: {
  type?: 'all' | 'meeting' | 'review' | 'host';
  page: number;
  size: number;
}): Promise<NotificationsResult> => {
  return {
    alarms: [
      {
        id: 101,
        type: 'MEETING',
        message: '관심 등록한 독서 모임이 새로 열렸어요!',
        timestamp: '2025-06-17T11:12:00',
      },
      {
        id: 102,
        type: 'REVIEW',
        message: '참여한 모임에 후기가 달렸어요!',
        timestamp: '2025-06-17T09:30:00',
      },
      {
        id: 103,
        type: 'HOST',
        message: '관심 등록한 독서 모임이 새로 열렸어요!',
        timestamp: '2025-06-17T11:12:00',
      },
      {
        id: 104,
        type: 'MEETING',
        message: '관심 등록한 독서 모임이 새로 열렸어요!',
        timestamp: '2025-06-17T11:12:00',
      },
      {
        id: 105,
        type: 'REVIEW',
        message: '참여한 모임에 후기가 달렸어요!',
        timestamp: '2025-06-17T09:30:00',
      },
    ],
    pageInfo: {
      page: 1,
      size: 10,
      totalElements: 5,
      totalPages: 1,
      hasNext: false,
    },
  };
  const searchParams = new URLSearchParams({
    type,
    page: page.toString(),
    size: size.toString(),
  });
  const res = await axiosInstance.get<APIResponse<NotificationsResult>>(
    `/notifications?${searchParams}`,
    {
      baseURL: API_V1_BASE_URL,
    },
  );
  const data = res.data;
  return data.result;
};
