import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { metaTemplates } from '@/shared/config/meta-templates';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import CreatedMeetingDetailIntroWrap from '@/routes/createdMeetingDetailIntro/_components/CreatedMeetingDetailIntroWrap';
import type { Route } from '.react-router/types/app/routes/createdMeetingDetailIntro/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';
import { createdMeetingsIntroQueryOptions } from '@/features/meetings/hooks/useCreatedMeetingsIntroQuery';
import { topicsQueryOptions } from '@/features/meetings/hooks/useTopicsQuery';

export function meta() {
  return metaTemplates.createdMeetingDetailIntro();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(createdMeetingsIntroQueryOptions(id)),
    queryClient.prefetchQuery(topicsQueryOptions()),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default function CreatedMeetingDetailIntro({
  loaderData,
}: Route.ComponentProps) {
  const { dehydratedState } = loaderData as {
    dehydratedState: DehydratedState;
  };

  const id = Number(useParams().meetingId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <CreatedMeetingDetailIntroWrap meetingId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
