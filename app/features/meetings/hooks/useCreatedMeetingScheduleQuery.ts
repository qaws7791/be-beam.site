import { getMyCreatedMeetingSchedule } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingScheduleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.createdMeetingSchedule(id).queryKey,
    queryFn: async () => getMyCreatedMeetingSchedule(id),
  });

export default function useCreatedMeetingScheduleQuery(id: number) {
  return useQuery(createdMeetingScheduleQueryOptions(id));
}
