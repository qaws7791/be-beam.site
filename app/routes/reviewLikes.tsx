import ReviewLikeCard from '@/components/molecules/ReviewLikeCard';
import useMyReviewLikesQuery from '@/hooks/api/useMyReviewLikesQuery';

export default function ReviewLikes() {
  const { data: reviewLikes } = useMyReviewLikesQuery({
    page: 1,
    size: 10,
  });

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviewLikes?.reviews?.map((review) => (
        <div key={review.reviewId}>
          <ReviewLikeCard {...review} />
        </div>
      ))}
    </div>
  );
}
