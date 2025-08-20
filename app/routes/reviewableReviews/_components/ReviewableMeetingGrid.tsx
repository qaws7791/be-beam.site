import ReviewableMeetingCard from '@/routes/reviewableReviews/_components/ReviewableMeetingCard';
import type { GetReviewableReviewsResult } from '@/shared/api/endpoints/users';

export default function ReviewableMeetingGrid({
  reviews,
}: {
  reviews: GetReviewableReviewsResult['reviews'];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
