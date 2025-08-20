import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { Suspense } from 'react';
import { metaTemplates } from '@/shared/config/meta-templates';
import WrittenReviewContent from '@/routes/writtenReviews/_components/WrittenReviewContent';

export function meta() {
  return metaTemplates.writtenReviews();
}

export default function WrittenReviews() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WrittenReviewContent />
    </Suspense>
  );
}
