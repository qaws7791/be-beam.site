import {
  getOpeningMeetingList,
  type OpeningMeetingListParams,
} from '@/shared/api/endpoints/mypage';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const createdMeetingsQueryOptions = (params: OpeningMeetingListParams) =>
  queryOptions({
    queryKey: ['createdMeetings', params],
    queryFn: () => getOpeningMeetingList(params),
  });

export default function useCreatedMeetingsQuery(
  params: OpeningMeetingListParams,
) {
  return useQuery(createdMeetingsQueryOptions(params));
}
