import type { Review } from '@/shared/types/entities';
import { cn } from '@/styles/tailwind';
import Text from '../../../shared/components/ui/Text';

interface MeetingReviewContentProps {
  rating: Review['rating'];
  images: Review['images'];
  text: Review['text'];
}

export default function MeetingReviewContent({
  rating,
  images,
  text,
}: MeetingReviewContentProps) {
  return (
    <div>
      <div className="flex w-full items-center">
        {Array.from({ length: rating }, (_, i) => (
          <img key={i} src="/images/icons/star.svg" alt="star_icons" />
        ))}
      </div>

      <div
        className={cn(
          images.length < 4 && images.length > 0 && 'flex gap-5',
          'mt-5 w-full',
        )}
      >
        <div
          className={
            images.length < 4 ? 'flex gap-3' : 'grid grid-cols-6 gap-3'
          }
        >
          {images.map((image: string, idx: number) => (
            <img
              key={idx}
              className="h-37 w-37 rounded-lg object-cover"
              src={image}
              alt="review_img"
            />
          ))}
        </div>

        <Text
          variant="B3_Regular"
          color="gray-600"
          className={cn(images.length > 3 && 'mt-3', 'flex-1')}
        >
          {text}
        </Text>
      </div>
    </div>
  );
}
