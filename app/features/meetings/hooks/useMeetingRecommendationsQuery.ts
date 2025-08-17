import { getRecommendationMeeting } from '@/shared/api/endpoints/home';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const meetingRecommendationsQueryOptions = (
  type: 'likes' | 'random' | 'recent',
  tab: 'all' | 'regular' | 'small',
) =>
  queryOptions({
    queryKey: ['recommendationMeetings', type, tab],
    queryFn: () => getRecommendationMeeting(type, tab),
  });

export default function useMeetingRecommendationQuery(
  type: 'likes' | 'random' | 'recent',
  tab: 'all' | 'regular' | 'small',
) {
  return useQuery(meetingRecommendationsQueryOptions(type, tab));
}
