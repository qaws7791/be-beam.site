import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router';
import { getMeetingDetail } from '@/api/meetings';
import { getMeetingReviews } from '@/api/meetingReviews';
import { metaTemplates } from '@/config/meta-templates';
import type { Route } from './+types/meetingDetail';
import type { meetingReviewFilterType } from '@/components/sections/MeetingDetailMeetingReviewsContainer';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import MeetingDetailWrap from '@/components/organisms/MeetingDetailWrap';

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
    queryClient.prefetchQuery({
      queryKey: ['meeting', Number(params.meetingId)],
      queryFn: () => getMeetingDetail(Number(params.meetingId)),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['meetingReviews', Number(params.meetingId), filter],
      queryFn: ({ pageParam }) =>
        getMeetingReviews(Number(params.meetingId), filter, pageParam),
      initialPageParam: 0,
    }),
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
    queryClient.prefetchQuery({
      queryKey: ['meeting', Number(params.meetingId)],
      queryFn: () => getMeetingDetail(Number(params.meetingId)),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['meetingReviews', Number(params.meetingId), filter],
      queryFn: ({ pageParam }) =>
        getMeetingReviews(Number(params.meetingId), filter, pageParam),
      initialPageParam: 0,
    }),
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
