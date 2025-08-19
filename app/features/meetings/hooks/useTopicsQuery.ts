import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTopics } from '@/shared/api/endpoints/topics';
import { topicsQueryKeys } from '../queries/queryKeys';

export const topicsQueryOptions = () =>
  queryOptions({
    queryKey: topicsQueryKeys.all.queryKey,
    queryFn: () => getTopics(),
  });

export default function useTopicsQuery() {
  return useQuery(topicsQueryOptions());
}
