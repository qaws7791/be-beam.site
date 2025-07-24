import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import ReviewableMeetingCard from '@/components/organisms/ReviewableMeetingCard';
import usePagination from '@/hooks/ui/usePagination';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.reviewableReviews();
}

const MOCK_REVIEWABLE_MEETING: {
  id: number;
  title: string;
  type: 'regular' | 'small';
  image: string;
}[] = [
  {
    id: 1,
    title: 'Fun meeting',
    type: 'regular',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 2,
    title: 'Not satisfied meeting',
    type: 'small',
    image: 'https://picsum.photos/200/201',
  },
];

export default function ReviewableReviews() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const pagination = usePagination({
    currentPage: page,
    totalPages: 6,
    maxVisiblePages: 5,
  });
  return (
    <div className="mt-8 flex flex-col gap-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_REVIEWABLE_MEETING.map((meeting) => (
          <div key={meeting.id}>
            <ReviewableMeetingCard meeting={meeting} />
          </div>
        ))}
      </div>
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
  );
}
