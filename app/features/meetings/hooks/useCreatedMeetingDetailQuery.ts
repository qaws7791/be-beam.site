import { getCreatedMeetingDetail } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meetingQueryKeys } from '../queries/queryKeys';

export const createdMeetingDetailQueryOptions = (id: number) =>
  queryOptions({
    queryKey: meetingQueryKeys.createdMeetingDetail(id).queryKey,
    queryFn: async () => getCreatedMeetingDetail(id),
  });

export default function useCreatedMeetingDetailQuery(id: number) {
  return useQuery(createdMeetingDetailQueryOptions(id));
}
