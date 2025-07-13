// import { axiosInstance } from '@/lib/axios';

import type { APIResponse, CursorPaginationResult } from '@/types/api';
import type { Meeting, Review } from '@/types/entities';
import axios from 'axios';

export type MeetingReviewsResult = {
  reviews: {
    reviewId: Review['reviewId'];
    profileImg: Review['profileImg'];
    nickname: Review['nickname'];
    rating: Review['rating'];
    text: Review['text'];
    images: Review['images'];
    createdAt: Review['createdAt'];
    likesCount: Review['likesCount'];
    liked: Review['liked'];
    myReview: Review['myReview'];
    meeting: {
      id: Meeting['id'];
      name: Meeting['name'];
    };
  }[];
  pageInfo: CursorPaginationResult;
};

// TODO: params를 별도의 타입으로 분리 필요
export const getMeetingReviews = async (
  meetingId: number,
  sort: string,
  type: string,
  rating: string | number,
  pageParam: number = 0,
) => {
  const res = await axios<APIResponse<MeetingReviewsResult>>({
    method: 'get',
    url: `/api/web/v2/meetings/${meetingId}/reviews?sort=${sort}&type=${type}&rating=${rating}&cursor=${pageParam}&size=12`,
  });
  const data = res.data;
  return data.result;
};
