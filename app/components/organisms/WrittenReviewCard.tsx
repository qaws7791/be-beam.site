import { Button } from '../atoms/button/Button';
import StarIcon from '../atoms/icons/StarIcon';
import { Tag } from '../atoms/tag/Tag';

interface WrittenReviewCardProps {
  review: {
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
  };
}

export default function WrittenReviewCard({ review }: WrittenReviewCardProps) {
  return (
    <div className="rounded-2xl border border-gray-300 px-7 pt-7 pb-6 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]">
      <div>
        <Tag variant={review.meeting.type === 'regular' ? 'blue' : 'primary'}>
          {review.meeting.type === 'regular' ? '정기모임' : '소모임'}
        </Tag>
        <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
          <img
            src={review.meeting.image}
            alt=""
            width={60}
            height={60}
            className="size-15 rounded-lg"
          />
          <p className="text-t3 text-gray-600">
            {`${review.meeting.title} 모임`}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5">
        <div className="flex">
          {Array.from({ length: review.rating }, (_, index) => (
            <StarIcon key={index} className="size-5 text-gray-700" />
          ))}
        </div>
        <p className="text-b1 text-gray-600">{review.content}</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {review.images.map((image, index) => (
          <img key={index} src={image} alt="" className="rounded-lg" />
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2.5">
        <Button variant="tertiary" className="flex-1">
          수정
        </Button>
        <Button variant="tertiary" className="flex-1">
          삭제
        </Button>
      </div>
    </div>
  );
}
