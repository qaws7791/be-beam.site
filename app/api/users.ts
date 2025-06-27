import { axiosInstance, axiosInstanceV1 } from '@/lib/axios';
import type { APIResponse } from '@/types/api';

export type MyProfileResult = {
  nickname: string;
  profileImage: string;
  introduction: string;
};

export const getMyProfile = () => {
  return axiosInstanceV1
    .get<APIResponse<MyProfileResult>>('users/my-profile')
    .then((res) => {
      return res.data.result;
    });
};

export type MyMeetingLikesResult = {
  nickname: string;
  profileImage: string;
  meetings: {
    id: number;
    title: string;
    recruitmentType: string;
    image: string;
    meetingStartTime: string;
    address: string;
    status: string;
    liked: boolean;
  }[];
};

export const getMyMeetingLikes = async ({
  page,
  size,
  type,
}: {
  page: number;
  size: number;
  type: 'regular' | 'small';
}) => {
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

export type MyReviewLikesResult = {
  nickname: string;
  profileImage: string;
  reviews: {
    reviewId: number;
    profileImg: string;
    nickname: string;
    rating: number;
    text: string;
    createdAt: string;
    images: string[];
    likesCount: number;
    liked: boolean;
    myReview: boolean;
    meeting: {
      id: number;
      name: string;
      link: string;
    };
  }[];
};

export const getMyReviewLikes = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
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

export type MyHostLikesResult = {
  nickname: string;
  profileImage: string;
  hosts: {
    id: number;
    nickname: string;
    profileImage: string;
    introduction: string;
    liked: boolean;
  }[];
};

export const getMyHostLikes = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
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

type MyInfoResult = {
  nickname: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  gender: '남성' | '여성';
  terms: boolean;
  userTerms: boolean;
  marketingTerms: boolean;
};

export const getMyInfo = async (): Promise<MyInfoResult> => {
  return {
    nickname: '닉네임',
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

export const updateMyInfo = async (data: {
  nickname: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  gender: 'MAN' | 'WOMAN';
  terms: boolean;
  userTerms: boolean;
  marketingTerms: boolean;
}) => {
  return;
  const res = await axiosInstance.patch<APIResponse<string>>(
    'users/my-info',
    data,
  );
  const result = res.data;
  return result;
};
