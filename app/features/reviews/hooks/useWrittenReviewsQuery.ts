import {
  getWrittenReviews,
  type GetWrittenReviewsParams,
} from '@/shared/api/endpoints/users';
import { useSuspenseQuery } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';

export function writtenReviewsQueryOptions(params: GetWrittenReviewsParams) {
  return {
    queryKey: reviewQueryKeys.writtenReviews(params).queryKey,
    queryFn: () => getWrittenReviews(params),
  };
}

export default function useWrittenReviewsQuery(
  params: GetWrittenReviewsParams,
) {
  return useSuspenseQuery(writtenReviewsQueryOptions(params));
}
