import ReviewLikeCard from '@/features/reviews/components/ReviewLikeCard';
import type { MyReviewLikesResult } from '@/shared/api/endpoints/users';

export default function ReviewGrid({
  reviews,
}: {
  reviews: MyReviewLikesResult['reviews'];
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewLikeCard {...review} />
        </div>
      ))}
    </div>
  );
}
