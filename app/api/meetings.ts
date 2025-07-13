// import { axiosInstance } from '@/lib/axios';

import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse, CursorPaginationResult } from '@/types/api';
import type {
  ImageType,
  Meeting,
  MeetingAttendance,
  MeetingSchedule,
  Participant,
  Topic,
} from '@/types/entities';
import axios from 'axios';

export type MeetingListResult = {
  pageInfo: CursorPaginationResult;
  meetings: {
    id: Meeting['id'];
    name: Meeting['name'];
    recruitmentStatus: Meeting['recruitingState'];
    recruitmentType: Meeting['recruitmentType'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: MeetingSchedule['address'];
    image: ImageType;
    applicantCount: number;
    participantCount: number;
  }[];
};

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
  const res = await axios<APIResponse<MeetingListResult>>({
    method: 'GET',
    url: `/api/web/v2/meetings?search=${search}&topic=${selectedTopic}&recruitment-type=${selectedFilters['모임 유형']}&recruitment-status=${selectedFilters['모집 상태']}&mode=${selectedFilters['모임 방식']}&cost=${selectedFilters['참가비']}&sort=${selectedFilters['정렬']}&cursor=${pageParam}&size=12`,
  });
  const data = res.data;
  return data.result;
};

export type MeetingDetailResult = {
  id: Meeting['id'];
  recruitingState: Meeting['recruitingState'];
  recruitmentType: Meeting['recruitmentType'];
  guidebookReferenceId: Meeting['guidebookReferenceId'];
  guidebookReferenceTitle: Meeting['guidebookReferenceTitle'];
  selectionType: Meeting['selectionType'];
  name: Meeting['name'];
  topic: Meeting['topic'];
  participantCount: Meeting['participantCount'];
  minParticipants: Meeting['minParticipants'];
  maxParticipants: Meeting['maxParticipants'];
  recruitingStartTime: Meeting['recruitingStartTime'];
  recruitingEndTime: Meeting['recruitingEndTime'];
  meetingMode: Meeting['meetingMode'];
  address: Meeting['address'];
  paymentAmount: Meeting['paymentAmount'];
  introduction: Meeting['introduction'];
  schedules: Meeting['schedules'];
  hashtags: Meeting['hashtags'];
  meetingImages: Meeting['meetingImages'];
  info: Meeting['info'];
  hostId: Meeting['hostId'];
  hostName: Meeting['hostName'];
  hostImage: Meeting['hostImage'];
  hostDescription: Meeting['hostDescription'];
  likesCount: Meeting['likesCount'];
  /** 로그인한 사용자 정보 */
  liked: Meeting['liked'];
  reviewable: Meeting['reviewable'];
  userStatus: Meeting['userStatus'];
};

export const getMeetingDetail = async (id: number) => {
  const res = await axios<APIResponse<MeetingDetailResult>>({
    method: 'GET',
    url: `/api/web/v2/meetings/${id}`,
  });
  const data = res.data;
  return data.result;
};

export type TopicListResult = {
  id: Topic['id'];
  topic: Topic['topic'];
}[];

export const getMeetingTopicList = async () => {
  const res = await axiosInstance<APIResponse<TopicListResult>>({
    method: 'GET',
    url: `/meetings/topics`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingIntroductionForHostResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  introduction: Meeting['introduction'];
  topic: Meeting['topic'];
  hashtags: Meeting['hashtags'];
  meetingThumbnail: ImageType;
  meetingImages: Meeting['meetingImages'];
  meetingStatus: Meeting['recruitingState'];
};

export const getMeetingIntroductionForHost = async (id: number) => {
  const res = await axiosInstance<
    APIResponse<MeetingIntroductionForHostResult>
  >({
    method: 'GET',
    url: `/meetings/${id}/mypage/introduction`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingDetailForHostResult = {
  selectionType: Meeting['selectionType'];
  meetingMode: Meeting['meetingMode'];
  recruitmentType: Meeting['recruitmentType'];
  minParticipants: Meeting['minParticipants'];
  maxParticipants: Meeting['maxParticipants'];
  recruitingEndTime: Meeting['recruitingEndTime'];
  paymentAmount: Meeting['paymentAmount'];
  info: Meeting['info'];
};

export const getMeetingDetailForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingDetailForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/detail`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingScheduleForHostResult = {
  meetingStartTime: MeetingSchedule['meetingStartTime'];
  meetingEndTime: MeetingSchedule['meetingEndTime'];
  address: MeetingSchedule['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getMeetingScheduleForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingScheduleForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/schedules`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingParticipantsForHostResult = {
  participantCount: number;
  participants: {
    id: Participant['id'];
    name: Participant['name'];
    image: Participant['image'];
    authority: Participant['authority'];
    status: Participant['status'];
  }[];
};

export const getMeetingParticipantsForHost = async (id: number) => {
  const res = await axiosInstance<
    APIResponse<MeetingParticipantsForHostResult>
  >({
    method: 'GET',
    url: `/meetings/${id}/mypage/participants`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingApplicantsForHostResult = {
  applicantCount: number;
  applicants: {
    id: Participant['id'];
    name: Participant['name'];
    image: Participant['image'];
    status: Participant['status'];
  }[];
};

export const getMeetingApplicantsForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingApplicantsForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/applicants`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingAttendanceForHostResult = {
  attendanceStatus: MeetingAttendance[];
};

export const getMeetingAttendanceForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingAttendanceForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/attendance`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingHostDetailForHostResult = {
  hostDescription: Meeting['hostDescription'];
};

export const getMeetingHostDetailForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingHostDetailForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/host`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type LikeMeetingResult = string;

export const likeMeeting = async (id: number) => {
  const res = await axiosInstance<APIResponse<LikeMeetingResult>>({
    method: 'POST',
    url: `/meetings/${id}/like`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export const unlikeMeeting = async (id: number) => {
  const res = await axiosInstance<APIResponse<LikeMeetingResult>>({
    method: 'DELETE',
    url: `/meetings/${id}/like`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type JoinMeetingData = {
  reasonForJoining: string;
};

export type JoinMeetingResult = string;

export const joinMeeting = async (id: number, data: JoinMeetingData) => {
  const res = await axiosInstance<APIResponse<JoinMeetingResult>>({
    method: 'POST',
    url: `/meetings/${id}/join`,
    baseURL: API_V1_BASE_URL,
    data,
  });
  return res.data.result;
};

export type CancelMeetingData = {
  reasonType: string; // TODO: 이거 어떻게 되는지 확인해야함
  description: string;
};

export const cancelMeeting = async (id: number, data: CancelMeetingData) => {
  const res = await axiosInstance<APIResponse<JoinMeetingResult>>({
    method: 'DELETE',
    url: `/meetings/${id}/cancel`,
    baseURL: API_V1_BASE_URL,
    data,
  });
  return res.data.result;
};
