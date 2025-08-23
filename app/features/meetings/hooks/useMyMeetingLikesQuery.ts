import {
  getMyMeetingLikes,
  type MyMeetingLikesParams,
} from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

const myMeetingLikesQueryOptions = ({
  page,
  size,
  type,
}: MyMeetingLikesParams) => {
  return queryOptions({
    queryKey: meetingQueryKeys.likedMeetings({ page, size, type }).queryKey,
    queryFn: () => getMyMeetingLikes({ page, size, type }),
  });
};

export default function useMyMeetingLikesQuery({
  page,
  size,
  type,
}: {
  page: number;
  size: number;
  type: 'regular' | 'small';
}) {
  return useQuery(myMeetingLikesQueryOptions({ page, size, type }));
}
