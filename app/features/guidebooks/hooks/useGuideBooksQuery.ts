import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getGuideBookList } from '@/shared/api/endpoints/guideBooks';

import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';

export const guideBooksInfiniteQueryOptions = (filters: GuideBookListFilters) =>
  infiniteQueryOptions({
    queryKey: ['guideBooks', filters],
    queryFn: ({ pageParam }) => getGuideBookList(filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });

export default function useGuideBooksQuery(filters: GuideBookListFilters) {
  return useInfiniteQuery(guideBooksInfiniteQueryOptions(filters));
}
