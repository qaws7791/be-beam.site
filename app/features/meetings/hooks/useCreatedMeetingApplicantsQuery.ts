import { getMyCreatedMeetingApplicants } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingApplicantsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.meetingApplicants(id).queryKey,
    queryFn: async () => getMyCreatedMeetingApplicants(id),
  });

export default function useCreatedMeetingApplicantsQuery(id: number) {
  return useSuspenseQuery(createdMeetingApplicantsQueryOptions(id));
}
