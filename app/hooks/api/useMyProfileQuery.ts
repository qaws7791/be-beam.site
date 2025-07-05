import { getMyProfile } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const MyProfileQueryOptions = queryOptions({
  queryKey: ['my-profile'],
  queryFn: () => getMyProfile(),
  throwOnError: false,
});

export default function useMyProfileQuery() {
  return useQuery(MyProfileQueryOptions);
}
