import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import WrittenReviewCard from '@/components/organisms/WrittenReviewCard';
import usePagination from '@/hooks/ui/usePagination';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.writtenReviews();
}

const MOCK_REVIEW_LIST: {
  id: number;
  user: {
    name: string;
    profileImage: string;
    id: number;
  };
  content: string;
  rating: number;
  images: string[];
  meeting: {
    title: string;
    id: number;
    type: 'regular' | 'small';
    image: string;
  };
  likes: {
    count: number;
    isLiked: boolean;
  };
  createdAt: string;
}[] = [
  {
    id: 2,
    user: {
      name: 'John Doe',
      profileImage: 'https://picsum.photos/200/300',
      id: 2,
    },
    content: 'This meeting was so much fun! I highly recommend it.',
    rating: 5,
    images: [
      'https://picsum.photos/200/200',
      'https://picsum.photos/200/201',
      'https://picsum.photos/200/202',
    ],
    meeting: {
      title: 'Fun meeting',
      id: 2,
      type: 'regular',
      image: 'https://picsum.photos/200/200',
    },
    likes: {
      count: 2,
      isLiked: false,
    },
    createdAt: '2023-02-15T10:00:00.000Z',
  },
  {
    id: 3,
    user: {
      name: 'Jane Doe',
      profileImage: 'https://picsum.photos/200/301',
      id: 3,
    },
    content: 'I was not satisfied with this meeting.',
    rating: 2,
    images: [
      'https://picsum.photos/200/200',
      'https://picsum.photos/200/201',
      'https://picsum.photos/200/202',
    ],
    meeting: {
      title: 'Not satisfied meeting',
      id: 3,
      type: 'small',
      image: 'https://picsum.photos/200/201',
    },
    likes: {
      count: 1,
      isLiked: false,
    },
    createdAt: '2023-02-14T10:00:00.000Z',
  },
  {
    id: 4,
    user: {
      name: 'Bob Doe',
      profileImage: 'https://picsum.photos/200/302',
      id: 4,
    },
    content:
      'This meeting was so so. I didn t enjoy it. I will not recommend it. I will not recommend it. ',
    rating: 3,
    images: [
      'https://picsum.photos/200/200',
      'https://picsum.photos/200/201',
      'https://picsum.photos/200/202',
    ],
    meeting: {
      title: 'So so meeting',
      id: 4,
      type: 'regular',
      image: 'https://picsum.photos/200/202',
    },
    likes: {
      count: 0,
      isLiked: false,
    },
    createdAt: '2023-02-13T10:00:00.000Z',
  },
];

export default function WrittenReviews() {
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
        {MOCK_REVIEW_LIST.map((review) => (
          <div key={review.id}>
            <WrittenReviewCard review={review} />
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
