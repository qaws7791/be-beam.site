import type { MeetingReviewsParams } from '@/shared/api/endpoints/meetingReviews';
import type { getReviewListParams } from '@/shared/api/endpoints/reviews';
import type {
  GetReviewableReviewsParams,
  GetWrittenReviewsParams,
  MyReviewLikesParams,
} from '@/shared/api/endpoints/users';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const reviewQueryKeys = createQueryKeys('reviews', {
  list: (params: getReviewListParams) => [params],
  meetingReviews: (filters: MeetingReviewsParams) => [filters],
  likedReviews: (params: MyReviewLikesParams) => [params],
  reviewableReviews: (params: GetReviewableReviewsParams) => [params],
  writtenReviews: (params: GetWrittenReviewsParams) => [params],
});
