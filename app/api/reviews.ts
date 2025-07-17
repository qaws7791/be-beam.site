import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';

export type getReviewListParams = {
  sort: 'recent' | 'likes';
  type: 'image' | 'text';
  rating: 'all' | '1' | '2' | '3' | '4' | '5';
  recruitmentType: 'all' | 'regular' | 'small';
  cursor?: number;
  size?: number;
};

export type ReviewListResult = {
  reviews: {
    reviewId: number;
    profileImg: string;
    nickname: string;
    rating: number;
    text: string;
    images: string[];
    createdAt: string;
    likesCount: number;
    liked: boolean;
    myReview: boolean;
    meeting: {
      id: number;
      name: string;
      recruitmentType: '정기모임' | '소모임';
      image: string;
    };
  }[];
  pageInfo: {
    nextCursor: number;
    size: number;
    hasNext: boolean;
  };
};

export const getReviewList = async ({
  sort,
  type,
  rating,
  recruitmentType,
  cursor = 0,
  size = 20,
}: getReviewListParams) => {
  const searchParams = new URLSearchParams({
    sort,
    type,
    rating,
    'recruitment-type': recruitmentType,
    cursor: cursor.toString(),
    size: size.toString(),
  });

  const res = await axiosInstance.get<{
    isSuccess: boolean;
    code: number;
    message: string;
    result: ReviewListResult;
  }>(`/reviews?${searchParams.toString()}`);
  const data = res.data;
  return data.result;
};

export const likeReview = async ({ reviewId }: { reviewId: number }) => {
  // return {
  //   reviewId,
  // };
  await axiosInstance.post<void>(`/reviews/${reviewId}/like`, undefined, {
    baseURL: API_V1_BASE_URL,
  });
};

export const unlikeReview = async ({ reviewId }: { reviewId: number }) => {
  // return {
  //   reviewId,
  // };
  await axiosInstance.delete<void>(`/reviews/${reviewId}/like`, {
    baseURL: API_V1_BASE_URL,
  });
};
export const createReview = async (review: {
  rating: number;
  text: string;
  images: File[];
  meetingId: number;
}) => {
  console.log('createReview', review);
  return;
  // const formData = new FormData();
  // review.images.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: review.rating,
  //   text: review.text,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.post(`/meetings/${review.meetingId}/reviews`, formData);
  // return;
};

export const updateReview = async (review: {
  reviewId: number;
  rating: number;
  content: string;
  existingImages: string[];
  newImages: File[];
}) => {
  console.log('updateReview', review);
  return;
  // const formData = new FormData();
  // review.newImages.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: review.rating,
  //   text: review.content,
  //   existingImages: review.existingImages,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.patch(`/reviews/${review.reviewId}`, formData);
  // return;
};

export const deleteReview = async ({ reviewId }: { reviewId: number }) => {
  console.log('deleteReview', reviewId);
  return;
  // await axiosInstance.delete(`/reviews/${reviewId}`);
  // return;
};
