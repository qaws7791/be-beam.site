import type { MyParticipatedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import { getParticipationMeetingList } from '@/shared/api/endpoints/mypage';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const participatedMeetingsQueryOptions = (
  filters: MyParticipatedMeetingFilters,
) =>
  queryOptions({
    queryKey: meetingQueryKeys.participatedMeetings(filters).queryKey,
    queryFn: () => getParticipationMeetingList(filters),
  });

export default function useParticipatedMeetingsQuery(
  filters: MyParticipatedMeetingFilters,
) {
  return useQuery(participatedMeetingsQueryOptions(filters));
}
