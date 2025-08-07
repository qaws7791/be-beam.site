import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { requireAuth } from '@/lib/auth.server';
import { getTopics } from '@/api/topics';

import type { Route } from './+types/createdMeetingDetailIntro';
import { metaTemplates } from '@/config/meta-templates';
import { getMyCreatedMeetingIntro } from '@/api/users';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import CreatedMeetingDetailIntroWrap from '@/components/organisms/CreatedMeetingDetailIntroWrap';

export function meta() {
  return metaTemplates.createdMeetingDetailIntro();
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingIntro', id],
      queryFn: () => getMyCreatedMeetingIntro(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['topics'],
      queryFn: () => getTopics(),
    }),
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
