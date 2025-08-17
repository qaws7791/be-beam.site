import { getMyCreatedMeetingAttendance } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const createdMeetingAttendanceQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['attendance', id],
    queryFn: async () => getMyCreatedMeetingAttendance(id),
  });

export default function useCreatedMeetingAttendance(id: number) {
  return useSuspenseQuery(createdMeetingAttendanceQueryOptions(id));
}
