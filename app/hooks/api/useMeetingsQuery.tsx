import { getMeetingList } from '@/api/meetings';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export function useMeetingsQuery(
  search: string,
  selectedTopic: string,
  selectedFilters: Record<string, string>,
) {
  return useSuspenseInfiniteQuery({
    queryKey: ['meetings', search, selectedTopic, selectedFilters],
    queryFn: ({ pageParam }) =>
      getMeetingList(search, selectedTopic, selectedFilters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
    // maxPages: 나중에 위의 페이지가 사라질 것을 고려하여 사용X
  });
}
