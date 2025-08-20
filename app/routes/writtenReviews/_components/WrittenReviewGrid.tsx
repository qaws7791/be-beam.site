import WrittenReviewCard from '@/routes/writtenReviews/_components/WrittenReviewCard';
import type { GetWrittenReviewsResult } from '@/shared/api/endpoints/users';

export default function WrittenReviewGrid({
  reviews,
}: {
  reviews: GetWrittenReviewsResult['reviews'];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <WrittenReviewCard
            review={{
              id: review.reviewId,
              content: review.content,
              rating: review.rating,
              images: review.images,
              meeting: {
                name: review.meetingName,
                id: review.meetingId,
                recruitmentType: review.recruitmentType,
                image: review.thumbnailImage,
              },
              createdAt: review.createdAt,
            }}
          />
        </div>
      ))}
    </div>
  );
}
