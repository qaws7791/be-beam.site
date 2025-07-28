import {
  getLikesMeetings,
  getRandomMeetings,
  getRecentMeetings,
} from '@/api/home';
import { useQuery } from '@tanstack/react-query';

export const meetingRecommendationQueryOptions = ({
  tab,
  type,
}: {
  tab: 'all' | 'regular' | 'small';
  type: 'likes' | 'random' | 'recent';
}) => {
  return {
    queryKey: ['recommendationMeetings', tab, type],
    queryFn: () => {
      if (type === 'likes') {
        return getLikesMeetings({ type: tab });
      } else if (type === 'random') {
        return getRandomMeetings({ type: tab });
      } else if (type === 'recent') {
        return getRecentMeetings({ type: tab });
      }
    },
  };
};

export default function useMeetingRecommendationQuery(
  tab: 'all' | 'regular' | 'small',
  type: 'likes' | 'random' | 'recent',
) {
  return useQuery(meetingRecommendationQueryOptions({ tab, type }));
}
