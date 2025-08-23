import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailMeetingReviewsContainer';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import MeetingDetailWrap from '@/routes/meetingDetail/_components/MeetingDetailWrap';
import type { Route } from '.react-router/types/app/routes/meetingDetail/+types';
import { meetingQueryOptions } from '@/features/meetings/hooks/useMeetingQuery';
import { meetingReviewsInfiniteQueryOptions } from '@/features/reviews/hooks/useMeetingReviewsQuery';

export function meta() {
  return metaTemplates.meetingDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const filter: meetingReviewFilterType = {
    type: 'text',
    rating: 'all',
    sort: 'recent',
  };

  await Promise.all([
    queryClient.prefetchQuery(meetingQueryOptions(Number(params.meetingId))),
    queryClient.prefetchInfiniteQuery(
      meetingReviewsInfiniteQueryOptions(Number(params.meetingId), filter),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const filter: meetingReviewFilterType = {
    type: 'text',
    rating: 'all',
    sort: 'recent',
  };

  await Promise.all([
    queryClient.prefetchQuery(meetingQueryOptions(Number(params.meetingId))),
    queryClient.prefetchInfiniteQuery(
      meetingReviewsInfiniteQueryOptions(Number(params.meetingId), filter),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
}

export default function MeetingDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().meetingId);
  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <MeetingDetailWrap id={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
