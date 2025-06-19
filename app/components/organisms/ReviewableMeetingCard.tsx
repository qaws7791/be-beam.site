import StarOutlineIcon from '../atoms/icons/StarOutlineIcon';
import { Tag } from '../atoms/tag/Tag';
import { ReviewDialog } from './ReviewDialog';

interface ReviewableMeetingCardProps {
  meeting: {
    id: number;
    title: string;
    type: 'regular' | 'small' | 'event';
    image: string;
  };
}

export default function ReviewableMeetingCard({
  meeting,
}: ReviewableMeetingCardProps) {
  const handleReviewSubmit = (review: {
    rating: number;
    content: string;
    images: File[];
  }) => {
    // TODO: API 호출로 후기 제출 로직 구현
    console.log('Review submitted:', review);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={meeting.image}
            alt=""
            width={60}
            height={60}
            className="size-15 rounded-lg border border-gray-200"
          />
          <div className="flex flex-col">
            <p className="text-t1 font-bold">{meeting.title}</p>
            <div className="mt-1 flex items-center gap-1">
              <Tag variant={meeting.type === 'regular' ? 'blue' : 'primary'}>
                {meeting.type === 'regular' ? '정기모임' : '소모임'}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5.5">
        <div className="flex justify-center">
          {Array.from({ length: 5 }, (_, index) => (
            <StarOutlineIcon key={index} className="size-6 text-gray-500" />
          ))}
        </div>
        <p className="text-center text-t4 text-gray-600">
          참여한 모임은 어떠셨나요?
          <br />
          소중한 경험을 함께 나눠요🥰
        </p>
      </div>
      <div className="mt-5">
        <ReviewDialog meeting={meeting} onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}
