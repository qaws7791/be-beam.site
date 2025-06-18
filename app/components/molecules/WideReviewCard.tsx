import ThreeDotHorizontalIcon from '../atoms/icons/ThreeDotHorizontalIcon';
import StarIcon from '../atoms/icons/StarIcon';
import { Link } from 'react-router';
import ArrowRightIcon from '../atoms/icons/ArrowRightIcon';
import HeartIcon from '../atoms/icons/HeartIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../atoms/dropdown-menu/DropdownMenu';

interface WideReviewCardProps {
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
}

export default function WideReviewCard({
  review,
}: {
  review: WideReviewCardProps;
}) {
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ThreeDotHorizontalIcon className="size-6 text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>수정하기</DropdownMenuItem>
              <DropdownMenuItem>삭제하기</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
}
