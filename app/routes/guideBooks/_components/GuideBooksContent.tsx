import { useMemo } from 'react';
import useGuideBooksQuery from '@/features/guidebooks/hooks/useGuideBooksQuery';
import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import type { FilterOption } from '@/shared/types/components';
import { TabsContent } from '../../../shared/components/ui/Tabs';
import GuideBookCard from '../../../features/guidebooks/components/GuideBookCard';
import LoadingSpinner from '../../../shared/components/ui/LoadingSpinner';

export default function GuideBooksContent({
  list,
  filters,
}: {
  list: FilterOption[];
  filters: GuideBookListFilters;
}) {
  const {
    isLoading,
    data: guideBooks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGuideBooksQuery(filters);

  const allGuideBooks = useMemo(() => {
    return guideBooks?.pages?.flatMap((page) => page.guidebooks) || [];
  }, [guideBooks]);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      {list.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-8 w-full px-4 lg:mt-10"
        >
          <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {allGuideBooks?.map((data) => (
              <GuideBookCard key={data.id} data={data} />
            ))}
          </div>

          {(isLoading || isFetchingNextPage) && <LoadingSpinner />}
        </TabsContent>
      ))}
    </>
  );
}
