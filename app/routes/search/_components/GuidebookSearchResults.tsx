import useSearchGuidebooksQuery from '@/features/search/hooks/useSearchGuidebooksQuery';
import Text from '@/shared/components/ui/Text';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';

export default function GuidebookSearchResults({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchGuidebooksQuery({ search: query, size: 20 });

  const allGuidebooks = data?.pages.flatMap((page) => page.guidebooks) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">가이드북</h2>
          <span className="text-b2">
            {data?.pages[0].pageInfo.totalElements}건
          </span>
        </div>
      </div>
      {allGuidebooks.length ? (
        <div className="mt-6 grid grid-cols-4 gap-5">
          {allGuidebooks?.map((guidebook) => (
            <Link
              className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
              key={guidebook.id}
              to={`/guideBook/${guidebook.id}`}
            >
              <img
                className="h-[240px] w-full object-cover"
                src={guidebook.thumbnailImage}
                alt="guidBook_thumbnail"
              />
              <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
                <Text variant="T2_Semibold" className="truncate">
                  {guidebook.title}
                </Text>
                <Text
                  variant="T4_Regular"
                  color="gray-700"
                  className="mt-3 truncate"
                >
                  {guidebook.description}
                </Text>
              </div>
            </Link>
          ))}
          {allGuidebooks?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 가이드북을 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">가이드북이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
