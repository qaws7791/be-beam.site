import { getMyInfo } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

const genderMap = {
  남성: 'MAN',
  여성: 'WOMAN',
};

export const myInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['my-info'],
    queryFn: () => getMyInfo(),
    select: (data) => ({
      ...data,
      gender: genderMap[data.gender],
      birthday: data.birthday.replaceAll('-', '.'),
      phoneNumber: data.phoneNumber.replaceAll('-', ''),
    }),
  });
};

export default function useMyInfoQuery() {
  return useQuery(myInfoQueryOptions());
}
