import { getMeetingList } from '@/api/meetings';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useMeetingsQuery(
  search: string,
  selectedTopic: string,
  selectedFilters: Record<string, string>,
) {
  return useInfiniteQuery({
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
