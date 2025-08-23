import {
  getOpeningMeetingList,
  type OpeningMeetingListParams,
} from '@/shared/api/endpoints/mypage';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingsQueryOptions = (params: OpeningMeetingListParams) =>
  queryOptions({
    queryKey: meetingQueryKeys.createdMeetings(params).queryKey,
    queryFn: () => getOpeningMeetingList(params),
  });

export default function useCreatedMeetingsQuery(
  params: OpeningMeetingListParams,
) {
  return useQuery(createdMeetingsQueryOptions(params));
}
