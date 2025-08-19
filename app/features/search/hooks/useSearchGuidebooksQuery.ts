import { searchQueryKeys } from '@/features/search/queries/queryKeys';
import {
  getSearchGuidebookResult,
  type SearchGuidebookParams,
} from '@/shared/api/endpoints/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

export const searchGuidebooksQueryOptions = (params: SearchGuidebookParams) =>
  infiniteQueryOptions({
    queryKey: searchQueryKeys.guidebooks(params).queryKey,
    queryFn: ({ pageParam }) => getSearchGuidebookResult(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchGuidebooksQuery(
  params: SearchGuidebookParams,
) {
  return useInfiniteQuery(searchGuidebooksQueryOptions(params));
}
