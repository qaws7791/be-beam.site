import { metaTemplates } from '@/shared/config/meta-templates';
import { Suspense } from 'react';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import RegularMeetingLikesContent from '@/routes/regularMeetingLikes/_components/RegularMeetingLikesContent';

export function meta() {
  return metaTemplates.regularMeetingLikes();
}

export default function RegularMeetingLikes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegularMeetingLikesContent />
    </Suspense>
  );
}
