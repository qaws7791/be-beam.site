import { getMyProfile } from '@/api/users';
import { getAuthToken } from '@/lib/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const MyProfileQueryOptions = queryOptions({
  queryKey: ['my-profile'],
  queryFn: async () => {
    const isLoggedIn = getAuthToken();
    if (!isLoggedIn) {
      return null;
    }

    const profileResult = await getMyProfile();

    return profileResult;
  },
  throwOnError: false,
});

export default function useMyProfileQuery() {
  return useQuery(MyProfileQueryOptions);
}
