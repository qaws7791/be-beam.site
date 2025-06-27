import { getMyProfile } from '@/api/users';
import { getAuthToken } from '@/lib/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const MyProfileQueryOptions = queryOptions({
  queryKey: ['my-profile'],
  queryFn: async () => {
    return {
      nickname: '홍길동',
      profileImage: 'https://placehold.co/300',
      introduction: '홍길동입니다. 사진작가로 활동하고 있어요.',
    };
    const isLoggedIn = getAuthToken();
    if (!isLoggedIn) {
      return null;
    }

    const profileResult = await getMyProfile();
    return profileResult;
  },
  enabled: !!getAuthToken(),
  throwOnError: false,
});

export default function useMyProfileQuery() {
  return useQuery(MyProfileQueryOptions);
}
