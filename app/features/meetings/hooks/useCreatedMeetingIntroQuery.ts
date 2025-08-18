import { getMyCreatedMeetingIntro } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const createdMeetingIntroQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['createdMeetingIntro', id],
    queryFn: async () => getMyCreatedMeetingIntro(id),
  });

export default function useCreatedMeetingIntroQuery(id: number) {
  return useSuspenseQuery(createdMeetingIntroQueryOptions(id));
}
