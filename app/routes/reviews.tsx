import { SquareChip } from '@/components/atoms/chip/SquareChip';
import ArrowRightIcon from '@/components/atoms/icons/ArrowRightIcon';
import HeartIcon from '@/components/atoms/icons/HeartIcon';
import ImageIcon from '@/components/atoms/icons/ImageIcon';
import StarIcon from '@/components/atoms/icons/StarIcon';
import ThreeDotHorizontalIcon from '@/components/atoms/icons/ThreeDotHorizontalIcon';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import CommonTemplate from '@/components/templates/CommonTemplate';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Link } from 'react-router';

export function meta() {
  return [
    { title: '리뷰 페이지' },
    {
      name: 'description',
      content: '여러 사람들이 작성한 모임 후기를 확인하세요!',
    },
  ];
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
];

export default function Reviews() {
  return (
    <CommonTemplate>
      <img
        src="https://placehold.co/1480x524"
        alt="후기들이 증명해주는 비빔의 모임"
        className="rounded-[27px]"
      />
      <div className="mt-16 w-full">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="regular">정기모임</TabsTrigger>
            <TabsTrigger value="small">소모임</TabsTrigger>
          </TabsList>
          <div className="mt-4.5 flex w-full items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <SquareChip variant="secondary" asChild>
                <button className="flex cursor-pointer items-center gap-1.5">
                  <ImageIcon className="size-6 text-gray-800" />
                  사진 후기만 보기
                </button>
              </SquareChip>
              <SquareChip variant="secondary" asChild>
                <button className="flex cursor-pointer items-center gap-1.5">
                  <StarIcon className="size-6 text-gray-800" />
                  별점
                </button>
              </SquareChip>
            </div>
            <div>
              <RadioGroup
                defaultValue="latest"
                className="flex rounded-lg bg-gray-200 p-2"
              >
                <RadioGroupItem
                  value="latest"
                  id="sort-latest"
                  className="rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
                >
                  최신순
                </RadioGroupItem>

                <RadioGroupItem
                  value="like"
                  id="sort-like"
                  className="rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
                >
                  좋아요순
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>
          <TabsContent value="all">
            <ReviewListItem review={MOCK_REVIEW_LIST[0]} />
          </TabsContent>
          <TabsContent value="regular">Change your password here.</TabsContent>
          <TabsContent value="one-time">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </CommonTemplate>
  );
}

const ReviewListItem = ({
  review,
}: {
  review: (typeof MOCK_REVIEW_LIST)[0];
}) => {
  return (
    <div className="rounded-2xl border border-gray-300 px-[37px] pt-8 pb-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4.5">
          <img
            src={review.user.profileImage}
            alt="user"
            className="size-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="text-b2">{review.user.name}</p>
            <time className="text-c2 text-gray-600">
              {new Date(review.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
        <div>
          <ThreeDotHorizontalIcon className="size-6 text-black" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {Array.from({ length: review.rating }, (_, i) => i + 1).map((i) => (
          <StarIcon key={i} className="size-6 text-gray-700" />
        ))}
      </div>
      <div className="mt-5.5 flex gap-5.5">
        <div className="flex gap-2">
          {review.images.map((image, index) => (
            <img
              key={image + review.id + index}
              src={image}
              alt="review"
              className="size-37 rounded-lg"
            />
          ))}
        </div>
        <div>
          <p className="text-b3 text-gray-600">{review.content}</p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to={`/meetings/${review.meeting.id}`}
          className="flex items-center gap-1 text-t3 text-gray-600"
        >
          <p>`{review.meeting.title}` 모임 보러가기</p>
          <ArrowRightIcon className="size-6" />
        </Link>
      </div>
      <div className="mt-8">
        <button className="flex items-center gap-1 rounded-[28px] border border-gray-300 py-2 pr-4 pl-3 text-t4 text-gray-500">
          <HeartIcon className="size-6" />
          <span>좋아요 | {review.likes.count}</span>
        </button>
      </div>
    </div>
  );
};
