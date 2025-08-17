import { getMyCreatedMeetingApplicants } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const createdMeetingApplicantsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['applicants', id],
    queryFn: async () => getMyCreatedMeetingApplicants(id),
  });

export default function useCreatedMeetingApplicants(id: number) {
  return useSuspenseQuery(createdMeetingApplicantsQueryOptions(id));
}
