import { getMeetingReviews } from '@/api/meetingReviews';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useMeetingReviewsQuery(
  meetingId: number,
  sort: string,
  type: string,
  rating: string | number,
) {
  return useInfiniteQuery({
    queryKey: ['meetingReviews', meetingId, sort, type, rating],
    queryFn: ({ pageParam }) =>
      getMeetingReviews(meetingId, sort, type, rating, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
