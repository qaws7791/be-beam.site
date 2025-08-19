import { getMyInfo } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '../queries/queryKeys';

export const myInfoQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKeys.myInfo.queryKey,
    queryFn: () => getMyInfo(),
    select: (data) => ({
      ...data,
      gender: data.gender,
      birthday:
        data.birthday !== null ? data.birthday.replaceAll('-', '.') : null,
      phoneNumber:
        data.phoneNumber !== null ? data.phoneNumber.replaceAll('-', '') : null,
    }),
  });
};

export default function useMyInfoQuery() {
  return useQuery(myInfoQueryOptions());
}
