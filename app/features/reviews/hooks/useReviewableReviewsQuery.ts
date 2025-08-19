import {
  getReviewableReviews,
  type GetReviewableReviewsParams,
} from '@/shared/api/endpoints/users';
import { useSuspenseQuery } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';

export function reviewableReviewsQueryOptions(
  params: GetReviewableReviewsParams,
) {
  return {
    queryKey: reviewQueryKeys.reviewableReviews(params).queryKey,
    queryFn: () => getReviewableReviews(params),
  };
}

export default function useReviewableReviewsQuery(
  params: GetReviewableReviewsParams,
) {
  return useSuspenseQuery(reviewableReviewsQueryOptions(params));
}
