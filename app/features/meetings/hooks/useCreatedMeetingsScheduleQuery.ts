import { getMyCreatedMeetingSchedule } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const createdMeetingsScheduleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['createdMeetingsSchedule', id],
    queryFn: async () => getMyCreatedMeetingSchedule(id),
  });

export default function useCreatedMeetingsScheduleQuery(id: number) {
  return useQuery(createdMeetingsScheduleQueryOptions(id));
}
