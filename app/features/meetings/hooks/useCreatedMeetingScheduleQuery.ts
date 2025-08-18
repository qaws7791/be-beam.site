import { getMyCreatedMeetingSchedule } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const createdMeetingScheduleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['createdMeetingSchedule', id],
    queryFn: async () => getMyCreatedMeetingSchedule(id),
  });

export default function useCreatedMeetingScheduleQuery(id: number) {
  return useQuery(createdMeetingScheduleQueryOptions(id));
}
