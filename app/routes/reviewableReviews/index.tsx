import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { Suspense } from 'react';
import { metaTemplates } from '@/shared/config/meta-templates';
import ReviewableReviewsContent from '@/routes/reviewableReviews/_components/ReviewableReviewsContent';

export function meta() {
  return metaTemplates.reviewableReviews();
}

export default function ReviewableReviews() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReviewableReviewsContent />
    </Suspense>
  );
}
