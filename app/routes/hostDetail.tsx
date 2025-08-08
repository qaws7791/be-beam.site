import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getHostDetail } from '@/api/hosts';
import { metaTemplates } from '@/config/meta-templates';

import type { Route } from './+types/hostDetail';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import CommonTemplate from '@/components/templates/CommonTemplate';
import HostDetailWrap from '@/components/organisms/HostDetailWrap';

export function meta() {
  return metaTemplates.hostDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hostDetail', Number(params.hostId)],
    queryFn: () => getHostDetail(Number(params.hostId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hostDetail', Number(params.hostId)],
    queryFn: () => getHostDetail(Number(params.hostId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export default function HostDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams()?.hostId);

  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <HostDetailWrap id={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
