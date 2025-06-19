import { Chip } from '@/components/atoms/chip/Chip';
import CaretArrowDownIcon from '@/components/atoms/icons/CaretArrowDownIcon';
import ReviewableMeetingCard from '@/components/organisms/ReviewableMeetingCard';
import WrittenReviewCard from '@/components/organisms/WrittenReviewCard';
import { useSearchParams } from 'react-router';

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
    content: 'This meeting was so so. I didn t enjoy it.',
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

export default function MyReviews() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get('tab') || 'written';

  const handleTabChange = (tab: 'written' | 'reviewable') => {
    setSearchParams(
      { tab },
      {
        replace: true,
        preventScrollReset: true,
      },
    );
  };

  return (
    <div className="flex-1">
      <div>
        <h1 className="text-h2">나의 리뷰</h1>
        <p className="mt-2.5 text-b2 text-gray-600">
          참여 완료한 모임의 후기를 작성할 수 있어요.
        </p>
      </div>
      <div className="mt-12 flex items-center justify-between">
        <div className="flex gap-2.5">
          <Chip variant={tab === 'written' ? 'primary' : 'secondary'} asChild>
            <button onClick={() => handleTabChange('written')}>
              내가 쓴 후기
            </button>
          </Chip>
          <Chip
            variant={tab === 'reviewable' ? 'primary' : 'secondary'}
            asChild
          >
            <button onClick={() => handleTabChange('reviewable')}>
              작성 가능한 후기
            </button>
          </Chip>
        </div>
        <div>
          <Chip variant="secondary">
            전체
            <CaretArrowDownIcon className="size-6" />
          </Chip>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tab === 'written'
          ? MOCK_REVIEW_LIST.map((review) => (
              <WrittenReviewCard key={review.id} review={review} />
            ))
          : MOCK_REVIEWABLE_MEETING.map((meeting) => (
              <ReviewableMeetingCard key={meeting.id} meeting={meeting} />
            ))}
      </div>
    </div>
  );
}
