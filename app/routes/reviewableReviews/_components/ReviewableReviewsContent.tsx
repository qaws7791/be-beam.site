import useReviewableReviewsQuery from '@/features/reviews/hooks/useReviewableReviewsQuery';
import ReviewableMeetingGrid from './ReviewableMeetingGrid';
import useReviewableReviewPage from '@/routes/reviewableReviews/_hooks/useReviewableReviewPage';
import ReviewPagination from '@/routes/reviewableReviews/_components/ReviewPagination';

export default function ReviewableReviewsContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useReviewableReviewPage();

  const { data: reviewableReviews } = useReviewableReviewsQuery({
    type: 'all',
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <ReviewableMeetingGrid reviews={reviewableReviews?.reviews || []} />
      <ReviewPagination
        currentPage={currentPage}
        totalPages={reviewableReviews?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
