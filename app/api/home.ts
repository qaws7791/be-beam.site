import { API_V1_BASE_URL } from '@/constants/api';
import type { APIResponse } from '@/types/api';
import type {
  Banner,
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/types/entities';
import { axiosInstance } from '@/lib/axios';

export type HomeBannersResult = {
  banners: {
    bannerId: Banner['bannerId'];
    bannerImg: Banner['bannerImg'];
    bannerUrl: Banner['bannerUrl'];
  }[];
};

export const getBanner = async () => {
  const res = await axiosInstance<APIResponse<HomeBannersResult>>({
    baseURL: API_V1_BASE_URL,
    url: '/home/banners',
    method: 'GET',
  });
  return res.data.result;
};

export type LikesMeetingsParams = {
  type: 'all' | 'regular' | 'small';
};
export type LikesMeetingsResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getLikesMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axiosInstance<APIResponse<LikesMeetingsResult>>({
    method: 'GET',
    url: `/home/likes-meetings?type=${type}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type RandomMeetingsParams = {
  type: 'all' | 'regular' | 'small';
};
export type RandomMeetingsResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getRandomMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axiosInstance<APIResponse<LikesMeetingsResult>>({
    method: 'GET',
    url: `/home/random-meetings?type=${type}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type RecentMeetingsParams = {
  type: 'all' | 'regular' | 'small';
};
export type RecentMeetingsResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getRecentMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axiosInstance<APIResponse<LikesMeetingsResult>>({
    method: 'GET',
    url: `/home/recent-meetings?type=${type}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};
