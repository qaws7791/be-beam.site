import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTopics } from '@/shared/api/endpoints/topics';

export const topicsQueryOptions = () =>
  queryOptions({
    queryKey: ['topics'],
    queryFn: () => getTopics(),
  });

export default function useTopicsQuery() {
  return useQuery(topicsQueryOptions());
}
