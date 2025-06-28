import { getMyHostLikes } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

const myHostLikesQueryOptions = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return queryOptions({
    queryKey: ['my-host-likes', { page, size }],
    queryFn: () => getMyHostLikes({ page, size }),
  });
};

export default function useMyHostLikesQuery({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  return useQuery(myHostLikesQueryOptions({ page, size }));
}
