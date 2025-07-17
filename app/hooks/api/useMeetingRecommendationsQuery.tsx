import { getRecommendationMeeting } from '@/api/home';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingRecommendationQuery(
  type: string,
  tab: string,
) {
  return useQuery({
    queryKey: ['recommendationMeetings', type, tab],
    queryFn: () => getRecommendationMeeting(type, tab),
  });
}
