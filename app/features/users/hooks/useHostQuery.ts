import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getHostDetail } from '@/shared/api/endpoints/hosts';

export const hostQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['hostDetail', id],
    queryFn: () => getHostDetail(id),
  });

export default function useHostQuery(id: number) {
  return useSuspenseQuery(hostQueryOptions(id));
}
