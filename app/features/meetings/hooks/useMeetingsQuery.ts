import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getMeetingList } from '@/shared/api/endpoints/meetings';
import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';
import { meetingQueryKeys } from '../queries/queryKeys';

export const meetingsInfiniteQueryOptions = (
  meetingFilters: MeetingListFilters,
) =>
  infiniteQueryOptions({
    queryKey: meetingQueryKeys.list(meetingFilters).queryKey,
    queryFn: ({ pageParam }) => getMeetingList(meetingFilters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });

export default function useMeetingsQuery(meetingFilters: MeetingListFilters) {
  return useInfiniteQuery(meetingsInfiniteQueryOptions(meetingFilters));
}
