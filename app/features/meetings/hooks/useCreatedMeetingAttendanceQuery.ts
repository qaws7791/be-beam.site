import { getMyCreatedMeetingAttendance } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingAttendanceQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.meetingAttendance(id).queryKey,
    queryFn: async () => getMyCreatedMeetingAttendance(id),
  });

export default function useCreatedMeetingAttendance(id: number) {
  return useSuspenseQuery(createdMeetingAttendanceQueryOptions(id));
}
