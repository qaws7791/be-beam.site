import { getCreatedMeetingDetail } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const createdMeetingDetailQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['createdMeetingDetail', id],
    queryFn: async () => getCreatedMeetingDetail(id),
  });

export default function useCreatedMeetingDetailQuery(id: number) {
  return useQuery(createdMeetingDetailQueryOptions(id));
}
