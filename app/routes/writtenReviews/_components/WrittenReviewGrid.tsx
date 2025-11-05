import WrittenReviewCard from '@/routes/writtenReviews/_components/WrittenReviewCard';
import type { GetWrittenReviewsResult } from '@/shared/api/endpoints/users';

export default function WrittenReviewGrid({
  reviews,
}: {
  reviews: GetWrittenReviewsResult['reviews'];
}) {
  return (
    <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 md:gap-5">
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
