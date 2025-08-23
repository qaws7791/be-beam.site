import { getMeetingReviews } from '@/shared/api/endpoints/meetingReviews';
import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailMeetingReviewsContainer';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';

export const meetingReviewsInfiniteQueryOptions = (
  meetingId: number,
  filters: meetingReviewFilterType,
) =>
  infiniteQueryOptions({
    queryKey: reviewQueryKeys.meetingReviews({
      meetingId,
      filters,
    }).queryKey,
    queryFn: ({ pageParam }) =>
      getMeetingReviews({ meetingId, filters }, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });

export default function useMeetingReviewsQuery(
  meetingId: number,
  filters: meetingReviewFilterType,
) {
  return useInfiniteQuery(
    meetingReviewsInfiniteQueryOptions(meetingId, filters),
  );
}
