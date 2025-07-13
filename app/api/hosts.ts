import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';
import type { Host } from '@/types/entities';

export type HostDetailResult = {
  hostName: Host['hostName'];
  hostImage: Host['hostImage'];
  hostInstruction: Host['hostInstruction'];
  followCount: Host['followCount'];
  openingMeetingCount: Host['openingMeetingCount'];
  openingMeetings: Host['openingMeetings'];
  followed: Host['followed'];
};

export const getHostDetail = async (id: number) => {
  const res = await axiosInstance<APIResponse<HostDetailResult>>({
    method: 'GET',
    url: `/hosts/${id}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};
