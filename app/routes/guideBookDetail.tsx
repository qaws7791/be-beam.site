import { useParams } from 'react-router';
import { Suspense } from 'react';
import { getGuideBookDetail } from '@/api/guideBooks';
import { metaTemplates } from '@/config/meta-templates';
import type { Route } from './+types/guideBookDetail';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import GuideBookDetailWrap from '@/components/organisms/GuideBookDetailWrap';

export function meta() {
  return metaTemplates.guideBookDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['guideBook', Number(params.guideBookId)],
    queryFn: () => getGuideBookDetail(Number(params.guideBookId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export default function GuideBookDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().guideBookId);
  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <GuideBookDetailWrap guideBookId={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
