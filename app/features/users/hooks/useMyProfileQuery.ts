import { getMyProfile } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '../queries/queryKeys';

export const myProfileQueryOptions = () =>
  queryOptions({
    queryKey: userQueryKeys.myProfile.queryKey,
    queryFn: () => getMyProfile(),
    throwOnError: false,
  });

export default function useMyProfileQuery() {
  return useQuery(myProfileQueryOptions());
}
