import {
  getSearchMeetingResult,
  type SearchMeetingParams,
} from '@/shared/api/endpoints/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { searchQueryKeys } from '../queries/queryKeys';

export const searchMeetingsQueryOptions = (params: SearchMeetingParams) =>
  infiniteQueryOptions({
    queryKey: searchQueryKeys.meetings(params).queryKey,
    queryFn: ({ pageParam }) => getSearchMeetingResult(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchMeetingsQuery(params: SearchMeetingParams) {
  return useInfiniteQuery(searchMeetingsQueryOptions(params));
}
