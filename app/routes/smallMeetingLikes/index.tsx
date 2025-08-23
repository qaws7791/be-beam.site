import { Suspense } from 'react';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { metaTemplates } from '@/shared/config/meta-templates';
import SmallMeetingLikesContent from '@/routes/smallMeetingLikes/_components/SmallMeetingLikesContent';

export function meta() {
  return metaTemplates.smallMeetingLikes();
}

export default function SmallMeetingLikes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SmallMeetingLikesContent />
    </Suspense>
  );
}
