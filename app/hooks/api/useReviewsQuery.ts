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
  };
  likes: {
    count: number;
    isLiked: boolean;
  };
  createdAt: string;
}[] = [
  {
    id: 1,
    user: {
      name: '김철수',
      profileImage: 'https://placehold.co/40x40',
      id: 1,
    },
    content: '비빔밥 모임 후기입니다.',
    rating: 5,
    images: ['https://placehold.co/148x148', 'https://placehold.co/148x148'],
    meeting: {
      title: '비빔밥 모임',
      id: 1,
    },
    likes: {
      count: 10,
      isLiked: true,
    },
    createdAt: '2025-06-17T12:00:00.000Z',
  },
  {
    id: 2,
    user: {
      name: '김철수',
      profileImage: 'https://placehold.co/40x40',
      id: 1,
    },
    content: '비빔밥 모임 후기입니다.',
    rating: 5,
    images: ['https://placehold.co/148x148', 'https://placehold.co/148x148'],
    meeting: {
      title: '비빔밥 모임',
      id: 1,
    },
    likes: {
      count: 10,
      isLiked: true,
    },
    createdAt: '2025-06-17T12:00:00.000Z',
  },
];
interface useReviewsProps {
  recruitmentType: string;
  sort: string;
  onlyImage: boolean;
  rating: number;
}

export default function useReviewsQuery({
  recruitmentType,
  sort,
  onlyImage,
  rating,
}: useReviewsProps) {
  return {
    data: MOCK_REVIEW_LIST,
    isLoading: false,
    isError: false,
    recruitmentType,
    sort,
    onlyImage,
    rating,
  };
}
