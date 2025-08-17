import { getMyCreatedMeetingIntro } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const createdMeetingsIntroQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['createdMeetingsIntro', id],
    queryFn: async () => getMyCreatedMeetingIntro(id),
  });

export default function useCreatedMeetingsIntroQuery(id: number) {
  return useSuspenseQuery(createdMeetingsIntroQueryOptions(id));
}
