import { Suspense } from 'react';
import { Outlet, useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  getMyCreatedMeetingDetail,
  getMyCreatedMeetingIntro,
} from '@/api/users';

import type { Route } from './+types/createdMeetingDetail';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import CreatedMeetingDetailWrap from '@/components/organisms/CreatedMeetingDetailWrap';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingIntro', id],
      queryFn: () => getMyCreatedMeetingIntro(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingDetail', id],
      queryFn: () => getMyCreatedMeetingDetail(id),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
}

export default function CreatedMeetingDetail({
  loaderData,
}: Route.ComponentProps) {
  const { dehydratedState } = loaderData;
  const id = Number(useParams().meetingId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <CommonTemplate>
          <CreatedMeetingDetailWrap meetingId={id} />
          <Outlet />
        </CommonTemplate>
      </Suspense>
    </HydrationBoundary>
  );
}
