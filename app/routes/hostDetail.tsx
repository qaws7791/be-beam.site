import { useParams } from 'react-router';
import { getHostDetail } from '@/api/hosts';
import { withOptionalAuth } from '@/lib/auth.server';

import type { Route } from './+types/hostDetail';
import CommonTemplate from '@/components/templates/CommonTemplate';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import HostDetailWrap from '@/components/organisms/HostDetailWrap';

export function meta() {
  return [
    { title: '호스트 상세페이지' },
    { name: 'description', content: '호스트 상세정보를 확인하세요.' },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  return withOptionalAuth(request, async () => {
    const cookiesHeaderFromBrowser = request.headers.get('Cookie');

    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    await queryClient.prefetchQuery({
      queryKey: ['hostDetail', params.hostId],
      queryFn: () =>
        getHostDetail(Number(params.hostId), {
          headers: axiosRequestConfigHeaders,
        }),
    });

    const dehydratedState = dehydrate(queryClient);

    return {
      dehydratedState,
    };
  });
}

export default function HostDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams()?.hostId);

  const { data } = loaderData;
  const dehydratedState = data?.dehydratedState;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <HostDetailWrap id={id} />
      </CommonTemplate>
    </HydrationBoundary>
  );
}
