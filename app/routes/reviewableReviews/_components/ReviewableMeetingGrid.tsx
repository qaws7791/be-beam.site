import ReviewableMeetingCard from '@/routes/reviewableReviews/_components/ReviewableMeetingCard';
import type { GetReviewableReviewsResult } from '@/shared/api/endpoints/users';

export default function ReviewableMeetingGrid({
  reviews,
}: {
  reviews: GetReviewableReviewsResult['reviews'];
}) {
  return (
    <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 md:gap-5">
      {reviews.map((review) => (
        <div key={review.meetingId}>
          <ReviewableMeetingCard
            meeting={{
              id: review.meetingId,
              title: review.meetingName,
              type: review.recruitmentType,
              image: review.thumbnailImage,
            }}
          />
        </div>
      ))}
    </div>
  );
}
