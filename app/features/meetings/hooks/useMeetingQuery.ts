import { getMeetingDetail } from '@/shared/api/endpoints/meetings';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const meetingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.detail(id).queryKey,
    queryFn: () => getMeetingDetail(id),
  });

export default function useMeetingQuery(id: number) {
  return useSuspenseQuery(meetingQueryOptions(id));
}
