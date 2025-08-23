import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { metaTemplates } from '@/shared/config/meta-templates';
import { Suspense } from 'react';
import ReviewLikesContent from '@/routes/reviewLikes/_components/ReviewLikesContent';

export function meta() {
  return metaTemplates.reviewLikes();
}

export default function ReviewLikes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReviewLikesContent />
    </Suspense>
  );
}
