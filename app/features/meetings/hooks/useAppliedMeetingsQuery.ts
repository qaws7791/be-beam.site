import type { MyAppliedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import { getApplicationMeetingList } from '@/shared/api/endpoints/mypage';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const appliedMeetingsQueryOptions = (filters: MyAppliedMeetingFilters) =>
  queryOptions({
    queryKey: ['appliedMeetings', filters],
    queryFn: () => getApplicationMeetingList(filters),
  });

export default function useAppliedMeetingsQuery(
  filters: MyAppliedMeetingFilters,
) {
  return useQuery(appliedMeetingsQueryOptions(filters));
}
