import {
  getTotalSearchResult,
  type SearchTotalParams,
} from '@/shared/api/endpoints/searches';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { searchQueryKeys } from '../queries/queryKeys';

export const searchTotalQueryOptions = (params: SearchTotalParams) =>
  queryOptions({
    queryKey: searchQueryKeys.total(params).queryKey,
    queryFn: () => getTotalSearchResult(params),
  });

export default function useSearchTotalQuery(params: SearchTotalParams) {
  return useQuery(searchTotalQueryOptions(params));
}
