import useMyReviewLikesQuery from '@/features/reviews/hooks/useMyReviewLikesQuery';
import ReviewGrid from '@/routes/reviewLikes/_components/ReviewGrid';
import ReviewPagination from '@/routes/reviewLikes/_components/ReviewPagination';
import useReviewLikesPage from '@/routes/reviewLikes/_hooks/useReviewLikesPage';

export default function ReviewLikesContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useReviewLikesPage();

  const { data: reviewLikes } = useMyReviewLikesQuery({
    page: currentPage,
    size: pageSize,
  });

  const reviews = reviewLikes?.reviews || [];
  const hasReviews = reviews.length > 0;

  return (
    <div>
      <ReviewGrid reviews={reviews} />

      {hasReviews && reviewLikes?.pageInfo && (
        <ReviewPagination
          currentPage={reviewLikes.pageInfo.page}
          totalPages={reviewLikes.pageInfo.totalPages}
          maxVisiblePages={maxVisiblePages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
