import { useInfiniteQuery } from '@tanstack/react-query';
import { getGuideBookList } from '@/api/guideBooks';

import type { GuideBookListFilters } from '@/schemas/guideBooksFilters';

export default function useGuideBooksQuery(filters: GuideBookListFilters) {
  return useInfiniteQuery({
    queryKey: ['guideBooks', filters],
    queryFn: ({ pageParam }) => getGuideBookList(filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
