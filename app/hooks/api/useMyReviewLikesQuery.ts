import { getMyReviewLikes } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

const myReviewLikesQueryOptions = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return queryOptions({
    queryKey: ['my-review-likes', { page, size }],
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
  return useQuery(myReviewLikesQueryOptions({ page, size }));
}
