import {
  getMyHostLikes,
  type MyHostLikesParams,
} from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { userQueryKeys } from '../queries/queryKeys';

const myHostLikesQueryOptions = (params: MyHostLikesParams) => {
  return queryOptions({
    queryKey: userQueryKeys.likedHosts(params).queryKey,
    queryFn: () => getMyHostLikes(params),
  });
};

export default function useMyHostLikesQuery(params: MyHostLikesParams) {
  return useSuspenseQuery(myHostLikesQueryOptions(params));
}
