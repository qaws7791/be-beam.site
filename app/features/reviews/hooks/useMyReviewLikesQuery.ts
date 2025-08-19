import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import { getMyReviewLikes } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const myReviewLikesQueryOptions = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return queryOptions({
    queryKey: reviewQueryKeys.likedReviews({ page, size }).queryKey,
    queryFn: () => getMyReviewLikes({ page, size }),
  });
};

export default function useMyReviewLikesQuery({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  return useSuspenseQuery(myReviewLikesQueryOptions({ page, size }));
}
