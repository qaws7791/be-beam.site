import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';
import type {
  EditCreateMeetingIntroType,
  EditMeetingDetailType,
} from '@/types/components';
import type { EditMeetingSchedule } from '@/types/entities';
import type {
  Host,
  LinkType,
  Meeting,
  MeetingSchedule,
  Review,
  UserInformation,
  UserProfile,
} from '@/types/entities';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export type MyProfileResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  introduction: UserProfile['introduction'];
  role: UserProfile['role'];
};

export const getMyProfile = async (axiosRequestConfig?: AxiosRequestConfig) => {
  try {
    const res = await axiosInstance.get<APIResponse<MyProfileResult>>(
      'users/my-profile',
      {
        baseURL: API_V1_BASE_URL,
        ...axiosRequestConfig,
      },
    );
    if (res.status === 200) {
      return res.data.result;
    }
    return null;
  } catch (error) {
    console.error('getMyProfile error: ', error);
    return null;
  }
};

export type MyMeetingLikesParams = {
  page: number;
  size: number;
  type: 'regular' | 'small';
};

export type MyMeetingLikesResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  meetings: {
    id: Meeting['id'];
    title: Meeting['name'];
    recruitmentType: Meeting['recruitmentType'];
    image: Meeting['meetingImages'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: Meeting['address'];
    status: Meeting['userStatus'];
    liked: Meeting['liked'];
  }[];
};

export const getMyMeetingLikes = async ({
  page,
  size,
  type,
}: MyMeetingLikesParams) => {
  return {
    nickname: '홍길동',
    profileImage: 'https://placehold.co/300',
    meetings: [
      {
        id: 1,
        title: '모임1',
        recruitmentType: '정기모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-15T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집종료',
        liked: true,
      },
      {
        id: 2,
        title: '소셜다이닝 : 이상식탁',
        recruitmentType: '소모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-15T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집종료',
        liked: true,
      },
      {
        id: 3,
        title: '모임3',
        recruitmentType: '정기모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-16T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집중',
        liked: false,
      },
      {
        id: 4,
        title: '소셜다이닝 : 이상식탁2',
        recruitmentType: '소모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-16T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집중',
        liked: false,
      },
      {
        id: 5,
        title: '소셜다이닝 : 이상식탁3',
        recruitmentType: '소모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-16T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집중',
        liked: false,
      },
      {
        id: 6,
        title: '소셜다이닝 : 이상식탁4',
        recruitmentType: '소모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-16T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집중',
        liked: false,
      },
      {
        id: 7,
        title: '소셜다이닝 : 이상식탁5',
        recruitmentType: '소모임',
        image: 'https://placehold.co/600x400',
        meetingStartTime: '2024-10-16T15:00:00',
        address: '부산 동래구 복천동',
        status: '모집중',
        liked: false,
      },
    ],
  };
  const searchParams = new URLSearchParams({
    cursor: page.toString(),
    size: size.toString(),
    type,
  });
  const res = await axiosInstance.get<APIResponse<MyMeetingLikesResult>>(
    `users/likes/meetings?${searchParams.toString()}`,
  );
  const data = res.data;
  return data.result;
};

export type MyReviewLikesParams = {
  page: number;
  size: number;
};

export type MyReviewLikesResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  reviews: {
    reviewId: Review['reviewId'];
    profileImg: Review['profileImg'];
    nickname: UserProfile;
    rating: Review['rating'];
    text: Review['text'];
    createdAt: Review['createdAt'];
    images: Review['images'];
    likesCount: Review['likesCount'];
    liked: Review['liked'];
    myReview: Review['myReview'];
    meeting: {
      id: Meeting['id'];
      name: Meeting['name'];
      link: LinkType;
    };
  }[];
};

export const getMyReviewLikes = async ({ page, size }: MyReviewLikesParams) => {
  return {
    nickname: '홍길동',
    profileImage: 'https://placehold.co/300',
    reviews: [
      {
        reviewId: 48,
        profileImg: 'https://placehold.co/300',
        nickname: '허남준 최고',
        rating: 5,
        text: '그래 내가 글 썼다...',
        images: [
          'https://placehold.co/300',
          'https://placehold.co/300',
          'https://placehold.co/300',
        ],
        createdAt: '2024-10-28T08:08:05.160458',
        likesCount: 0,
        liked: false,
        myReview: false,
        meeting: {
          id: 13,
          name: '소셜다이닝 : 이상식탁',
          link: 'https://www.be-beam.site/meeting/detail/49',
        },
      },
      {
        reviewId: 46,
        profileImg: 'https://placehold.co/300',
        nickname: '허남준 최고',
        rating: 5,
        text: '모임이 너무 최고였습니다!:)',
        images: [
          'https://placehold.co/300',
          'https://placehold.co/300',
          'https://placehold.co/300',
        ],
        createdAt: '2024-10-28T01:52:46.861053',
        likesCount: 1,
        liked: false,
        myReview: false,
        meeting: {
          id: 15,
          name: '사진출사모임 : 나를 기록하는 사진관 (정기모임) (모집마감)',
          link: 'https://www.be-beam.site/meeting/detail/49',
        },
      },
    ],
  };
  const searchParams = new URLSearchParams({
    cursor: page.toString(),
    size: size.toString(),
  });
  const res = await axiosInstance.get<APIResponse<MyReviewLikesResult>>(
    `users/likes/reviews?${searchParams.toString()}`,
  );
  const data = res.data;
  return data.result;
};

export type MyHostLikesParams = {
  page: number;
  size: number;
};

export type MyHostLikesResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  hosts: {
    nickname: Host['hostName'];
    profileImage: Host['hostImage'];
    introduction: Host['hostInstruction'];
    liked: Host['followed'];
  }[];
};

export const getMyHostLikes = async ({ page, size }: MyHostLikesParams) => {
  return {
    nickname: '홍길동',
    profileImage: 'https://placehold.co/300',
    hosts: [
      {
        id: 1,
        nickname: '홍길동동',
        profileImage: 'https://placehold.co/600x400',
        introduction: '홍길동입니다. 사진작가로 활동하고 있어요.',
        liked: true,
      },
      {
        id: 2,
        nickname: '홍길동동',
        profileImage: 'https://placehold.co/600x400',
        introduction: '홍길동입니다. 사진작가로 활동하고 있어요.',
        liked: true,
      },
    ],
  };
  const searchParams = new URLSearchParams({
    cursor: page.toString(),
    size: size.toString(),
  });
  const res = await axiosInstance.get<APIResponse<MyHostLikesResult>>(
    `users/likes/host?${searchParams.toString()}`,
  );
  const data = res.data;
  return data.result;
};

export type MyInfoResult = {
  name: UserInformation['name'];
  phoneNumber: UserInformation['phoneNumber'];
  email: UserInformation['email'];
  birthday: UserInformation['birthday'];
  gender: UserInformation['gender'];
  terms: UserInformation['terms'];
  userTerms: UserInformation['userTerms'];
  marketingTerms: UserInformation['marketingTerms'];
};

export const getMyInfo = async (): Promise<MyInfoResult> => {
  return {
    name: '닉네임',
    phoneNumber: '010-1234-5678',
    email: 'email@email.com',
    birthday: '2025-01-01',
    gender: '여성',
    terms: false,
    userTerms: false,
    marketingTerms: false,
  };
  const res =
    await axiosInstance.get<APIResponse<MyInfoResult>>('users/my-info');
  const data = res.data;
  return data.result;
};

export type UpdateMyInfoParams = {
  name: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  gender: 'MAN' | 'WOMAN';
  terms: boolean;
  userTerms: boolean;
  marketingTerms: boolean;
};

export type UpdateMyInfoResult = string;

export const updateMyInfo = async (params: UpdateMyInfoParams) => {
  return;
  const res = await axiosInstance.patch<APIResponse<UpdateMyInfoResult>>(
    'users/my-info',
    params,
  );
  const result = res.data;
  return result;
};

export type UpdateMyProfileParams = {
  nickname: string;
  introduction: string;
  profileImage?: File;
};

export type UpdateMyProfileResult = {
  nickname: UserProfile['nickname'];
  introduction: UserProfile['introduction'];
  profileImage: UserProfile['profileImage'];
};

export const updateMyProfile = async (params: UpdateMyProfileParams) => {
  return {
    nickname: params.nickname,
    profileImage: 'https://placehold.co/300',
    introduction: params.introduction,
  };
  // const formData = new FormData();
  // formData.append(
  //   'data',
  //   JSON.stringify({
  //     nickname: params.nickname,
  //     introduction: params.introduction,
  //   }),
  // );
  // if (params.profileImage) {
  //   formData.append('profileImage', params.profileImage);
  // }
  // const res = await axiosInstanceV1.patch<APIResponse<UpdateMyProfileResult>>(
  //   'users/my-profile',
  //   formData,
  // );
  // const data = res.data;
  // return data.result;
};

export async function getCreatedMeetingDetail(id: number) {
  const res = await axios({
    method: 'GET',
    url: `/api/web/v1/meetings/${id}/mypage`,
  });
  const data = res.data;
  return data.result;
}

export type ParticipationMeetingListParams = {
  status: 'participating' | 'completed' | 'cancelled';
  page: number;
  size: number;
};

export type ParticipationMeetingListResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  meetings: {
    id: Meeting['id'];
    title: Meeting['name'];
    recruitmentType: Meeting['recruitmentType'];
    image: Meeting['meetingImages'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: Meeting['address'];
    status: Meeting['userStatus'];
  }[];
};

export const getParticipationMeetingList = async (
  params: ParticipationMeetingListParams,
) => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    status: params.status,
  });
  const res = await axiosInstance<APIResponse<ParticipationMeetingListResult>>({
    method: 'GET',
    url: `/users/participation-meetings?${searchParams.toString()}`,
  });
  const data = res.data;
  return data.result;
};

export type OpeningMeetingListParams = {
  page: number;
  size: number;
  type: 'regular' | 'small';
};

export type OpeningMeetingListResult = {
  nickname: UserProfile['nickname'];
  profileImage: UserProfile['profileImage'];
  meetings: {
    id: Meeting['id'];
    title: Meeting['name'];
    recruitmentType: Meeting['recruitmentType'];
    image: Meeting['meetingImages'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: Meeting['address'];
    status: Meeting['userStatus'];
  }[];
};

export const getOpeningMeetingList = async (
  params: OpeningMeetingListParams,
) => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    type: params.type,
  });
  const res = await axiosInstance<APIResponse<OpeningMeetingListResult>>({
    method: 'GET',
    url: `/users/opening-meetings?${searchParams.toString()}`,
  });
  const data = res.data;
  return data.result;
};

export const withdrawUser = async () => {
  await axiosInstance.delete<void>('/users/', {
    baseURL: API_V1_BASE_URL,
  });
};

export async function getMyCreatedMeetingIntro(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/introduction`,
    method: 'GET',
  });
  return res.data.result;
}

export async function getMyCreatedMeetingDetail(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/detail`,
    method: 'GET',
  });
  return res.data.result;
}

export async function getMyCreatedMeetingSchedule(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/schedules`,
    method: 'GET',
  });
  return res.data.result;
}

export async function EditMeetingIntro(
  id: number,
  form: EditCreateMeetingIntroType,
  existingImages: string[],
) {
  const formData = new FormData();

  if (form.thumbnailImage) {
    formData.append('thumbnailImage', form.thumbnailImage);
  }

  if (form.images) {
    form.images.forEach((file) => {
      formData.append('files', file.value);
    });
  }

  formData.append(
    'data',
    new Blob(
      [
        JSON.stringify({
          name: form.name,
          introduction: form.introduction,
          topicId: form.topicId,
          hashtags: form.hashtags.map((hashtag) => hashtag.value),
          existingImages: existingImages,
          hostDescription: form.hostDescription,
        }),
      ],
      { type: 'application/json' },
    ),
  );

  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'PATCH',
    url: `/meetings/${id}/mypage/introduction`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function EditMeetingDetail(
  id: number,
  form: EditMeetingDetailType,
) {
  axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/detail`,
    method: 'PATCH',
    data: {
      ...form,
      minParticipants: Number(form.minParticipants),
      maxParticipants: Number(form.maxParticipants),
      recruitingEndTime: form.recruitingEndTime + 'T00:00:00',
      paymentAmount: Number(form.paymentAmount),
    },
  });
}

export async function EditMeetingSchedule(
  id: number,
  form: { schedules: EditMeetingSchedule[] },
) {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/schedules`,
    method: 'PATCH',
    data: form,
  });
}

export async function getMyCreatedMeetingApplicants(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/applicants`,
    method: 'GET',
  });
  return res.data.result;
}

export async function getMyCreatedMeetingParticipants(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/participants`,
    method: 'GET',
  });
  return res.data.result;
}

export function acceptOrRejectApplication(
  id: number,
  form: { userId: number; type: string },
) {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/users/${form.userId}`,
    method: 'PATCH',
    data: {
      status: form.type,
    },
  });
}

export async function getMyCreatedMeetingAttendance(id: number) {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}/mypage/attendance`,
    method: 'GET',
  });
  return res.data.result;
}

export function checkAttendance(
  meetingId: number,
  data: {
    scheduleId: number;
    userId: number;
    status: string;
  },
) {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${meetingId}/schedules/${data.scheduleId}/users/${data.userId}`,
    method: 'PATCH',
    data: {
      status: data.status,
    },
  });
}
