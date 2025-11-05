import { getMeetingReviews } from '@/shared/api/endpoints/meetingReviews';
import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailReviews';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';

export const meetingReviewsQueryOptions = (
  meetingId: number,
  filters: meetingReviewFilterType,
) =>
  queryOptions({
    queryKey: reviewQueryKeys.meetingReviews({
      meetingId,
      filters,
    }).queryKey,
    queryFn: () => getMeetingReviews({ meetingId, filters }),
  });

export default function useMeetingReviewsQuery(
  meetingId: number,
  filters: meetingReviewFilterType,
) {
  return useQuery(meetingReviewsQueryOptions(meetingId, filters));
}
