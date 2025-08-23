import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import type { getReviewListParams } from '@/shared/api/endpoints/reviews';
import { getReviewList } from '@/shared/api/endpoints/reviews';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useReviewsQuery(
  params: Omit<getReviewListParams, 'cursor'>,
) {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.list(params).queryKey,
    queryFn: ({ pageParam }) => getReviewList(params, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
