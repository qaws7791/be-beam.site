import { getMyCreatedMeetingParticipants } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingParticipantsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.createdMeetingParticipants(id).queryKey,
    queryFn: async () => getMyCreatedMeetingParticipants(id),
  });

export default function useCreatedMeetingParticipants(id: number) {
  return useSuspenseQuery(createdMeetingParticipantsQueryOptions(id));
}
