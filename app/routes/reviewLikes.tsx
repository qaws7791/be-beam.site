import ReviewLikeCard from '@/components/molecules/ReviewLikeCard';
import useMyReviewLikesQuery from '@/hooks/api/useMyReviewLikesQuery';

export default function ReviewLikes() {
  const { data: reviewLikes } = useMyReviewLikesQuery({
    page: 1,
    size: 10,
  });

  if (!reviewLikes?.reviews.length) {
    return (
      <div className="mt-8 flex h-40 items-center justify-center">
        <p className="text-gray-500">좋아요한 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviewLikes.reviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewLikeCard {...review} />
        </div>
      ))}
    </div>
  );
}
