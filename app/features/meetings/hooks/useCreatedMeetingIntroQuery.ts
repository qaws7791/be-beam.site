import { getMyCreatedMeetingIntro } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingIntroQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.createdMeetingIntro(id).queryKey,
    queryFn: async () => getMyCreatedMeetingIntro(id),
  });

export default function useCreatedMeetingIntroQuery(id: number) {
  return useSuspenseQuery(createdMeetingIntroQueryOptions(id));
}
