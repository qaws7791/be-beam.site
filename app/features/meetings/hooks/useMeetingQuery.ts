import { getMeetingDetail } from '@/shared/api/endpoints/meetings';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const meetingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['meeting', id],
    queryFn: () => getMeetingDetail(id),
  });

export default function useMeetingQuery(id: number) {
  return useSuspenseQuery(meetingQueryOptions(id));
}
