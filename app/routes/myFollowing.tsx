import HeartFillIcon from '@/components/atoms/icons/HeartFillIcon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import useMyHostLikesQuery from '@/hooks/api/useMyHostLikesQuery';
import usePagination from '@/hooks/ui/usePagination';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.myFollowing();
}

export default function MyFollowing() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const hostLikes = useMyHostLikesQuery({
    page: currentPage,
    size: 9,
  });
  const totalPages = 9;
  const pagination = usePagination({
    currentPage,
    totalPages,
  });
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">팔로잉 리스트</h1>
        <p className="text-b2 text-gray-600">
          내가 팔로잉하는 호스트를 모아보세요.
        </p>
      </div>
      <div className="mt-8 grid flex-1 grid-cols-3 gap-x-5 gap-y-8">
        {hostLikes.data?.hosts.map((host) => (
          <div key={host.id} className="flex flex-col gap-3">
            <div className="relative">
              <img
                src={host.profileImage}
                alt={host.nickname}
                className="w-full rounded-3xl object-cover"
              />
              <button className="absolute top-5 right-5">
                <HeartFillIcon className="size-8 text-error" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-t2">{host.nickname}</p>
              <p className="text-b3 text-gray-600">{host.introduction}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                to={{
                  search: `?page=${Math.max(pagination.currentPage - 5, 1)}`,
                }}
              />
            </PaginationItem>
            {pagination.pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={pagination.currentPage === page}
                  to={{
                    search: '?page=' + page,
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                to={{
                  search: `?page=${Math.min(pagination.currentPage + 5, pagination.totalPages)}`,
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
