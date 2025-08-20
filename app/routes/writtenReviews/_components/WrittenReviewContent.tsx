import useWrittenReviewsQuery from '@/features/reviews/hooks/useWrittenReviewsQuery';
import ReviewPagination from '@/routes/writtenReviews/_components/ReviewPagination';
import WrittenReviewGrid from '@/routes/writtenReviews/_components/WrittenReviewGrid';
import useWrittenReviewPage from '@/routes/writtenReviews/_hooks/useWrittenReviewPage';

export default function WrittenReviewContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useWrittenReviewPage();

  const { data: writtenReviews } = useWrittenReviewsQuery({
    type: 'all',
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <WrittenReviewGrid reviews={writtenReviews?.reviews || []} />
      <ReviewPagination
        currentPage={currentPage}
        totalPages={writtenReviews?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
