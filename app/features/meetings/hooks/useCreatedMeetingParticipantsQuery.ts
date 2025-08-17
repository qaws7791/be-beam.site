import { getMyCreatedMeetingParticipants } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const createdMeetingParticipantsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['participants', id],
    queryFn: async () => getMyCreatedMeetingParticipants(id),
  });

export default function useCreatedMeetingParticipants(id: number) {
  return useSuspenseQuery(createdMeetingParticipantsQueryOptions(id));
}
