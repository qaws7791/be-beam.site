import useSearchHostsQuery from '@/features/search/hooks/useSearchHostsQuery';
import HostCard from '@/features/users/components/HostCard';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function HostsSearchResults({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchHostsQuery({ search: query, size: 20 });

  const allHosts = data?.pages.flatMap((page) => page.hosts) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">호스트</h2>
          <span className="text-b2">
            {data?.pages[0].pageInfo.totalElements}건
          </span>
        </div>
      </div>
      {allHosts.length ? (
        <div className="mt-6 grid grid-cols-4 gap-5">
          {allHosts?.map((host) => <HostCard key={host.id} host={host} />)}
          {allHosts?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 호스트를 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">호스트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
