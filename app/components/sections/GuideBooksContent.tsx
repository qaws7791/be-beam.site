import { useMemo } from 'react';
import useGuideBooksQuery from '@/hooks/api/useGuideBooksQuery';
import type { GuideBookListFilters } from '@/schemas/guideBooksFilters';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';

import type { FilterOption } from '@/types/components';
import { TabsContent } from '../atoms/tabs/Tabs';
import GridGroup from '../organisms/gridGroup/GridGroup';
import GuideBookCard from '../organisms/GuideBookCard';
import LoadingSpinner from '../molecules/LoadingSpinner';

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
        <TabsContent key={tab.value} value={tab.value} className="mt-10 w-full">
          <GridGroup columns={3} gap={8}>
            {allGuideBooks?.map((data) => (
              <GuideBookCard key={data.id} data={data} />
            ))}
          </GridGroup>

          {(isLoading || isFetchingNextPage) && <LoadingSpinner />}
        </TabsContent>
      ))}
    </>
  );
}
