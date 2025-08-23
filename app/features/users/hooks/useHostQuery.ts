import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getHostDetail } from '@/shared/api/endpoints/hosts';
import { userQueryKeys } from '../queries/queryKeys';

export const hostQueryOptions = (id: number) =>
  queryOptions({
    queryKey: userQueryKeys.host(id).queryKey,
    queryFn: () => getHostDetail(id),
  });

export default function useHostQuery(id: number) {
  return useSuspenseQuery(hostQueryOptions(id));
}
