import { getRecommendationMeetings } from '@/api/home';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingRecommendationQuery(
  type: string,
  tab: string,
) {
  const apiEndpoints: Record<string, string> = {
    likes: '/api/web/v2/home/recommendation/likes',
    random: '/api/web/v2/home/recommendation/random',
    recent: '/api/web/v2/home/recommendation/recent',
  };

  return useQuery({
    queryKey: ['recommendationMeetings', apiEndpoints, type, tab],
    queryFn: () => getRecommendationMeetings(apiEndpoints, type, tab),
  });
}
