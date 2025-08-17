import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getMeetingList } from '@/shared/api/endpoints/meetings';
import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';

export const meetingsInfiniteQueryOptions = (
  meetingFilters: MeetingListFilters,
) =>
  infiniteQueryOptions({
    queryKey: ['meetings', meetingFilters],
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
