import ReviewLikeCard from '@/features/reviews/components/ReviewLikeCard';
import type { MyReviewLikesResult } from '@/shared/api/endpoints/users';

export default function ReviewGrid({
  reviews,
}: {
  reviews: MyReviewLikesResult['reviews'];
}) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewLikeCard {...review} />
        </div>
      ))}
    </div>
  );
}
