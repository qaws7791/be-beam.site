import { API_V1_BASE_URL } from '@/constants/api';
import type { APIResponse } from '@/types/api';
import type {
  Banner,
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/types/entities';
import axios from 'axios';

export type HomeBannersResult = {
  banners: {
    bannerId: Banner['bannerId'];
    bannerImg: Banner['bannerImg'];
    bannerUrl: Banner['bannerUrl'];
  }[];
};

export const getHomeBanners = async () => {
  const res = await axios<APIResponse<HomeBannersResult>>({
    method: 'GET',
    url: `/api/web/v2/home/banners`,
  });
  const data = res.data;
  return data.result;
};

export type LikesMeetingsParams = {
  type: 'all' | 'regular' | 'small';
};
export type LikesMeetingsResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitingState'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getLikesMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axios<APIResponse<LikesMeetingsResult>>({
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
  recruitmentStatus: Meeting['recruitingState'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getRandomMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axios<APIResponse<LikesMeetingsResult>>({
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
  recruitmentStatus: Meeting['recruitingState'];
  recruitmentType: Meeting['recruitmentType'];
  meetingDateTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getRecentMeetings = async ({ type }: LikesMeetingsParams) => {
  const res = await axios<APIResponse<LikesMeetingsResult>>({
    method: 'GET',
    url: `/home/recent-meetings?type=${type}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export const getRecommendationMeetings = async (
  apiEndpoints: Record<string, string>,
  type: string,
  tab: string,
) => {
  const res = await axios({
    method: 'GET',
    url: `${apiEndpoints[type]}?type=${tab}`,
  });
  const data = res.data;
  return data.result;
};
