import {
  getSearchHostResult,
  type SearchHostParams,
} from '@/shared/api/endpoints/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { searchQueryKeys } from '../queries/queryKeys';

export const searchHostsQueryOptions = (params: SearchHostParams) =>
  infiniteQueryOptions({
    queryKey: searchQueryKeys.hosts(params).queryKey,
    queryFn: ({ pageParam }) => getSearchHostResult(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchHostsQuery(params: SearchHostParams) {
  return useInfiniteQuery(searchHostsQueryOptions(params));
}
