import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getBanner } from '@/shared/api/endpoints/home';
import { metaTemplates } from '@/shared/config/meta-templates';

import HomeTemplate from '@/routes/home/_components/HomeTemplate';
import MainVisualSlider from '@/routes/home/_components/MainVisualSlider';
import AboutSection from '@/routes/home/_components/AboutSection';
import MeetingRecommendationSection from '@/routes/home/_components/MeetingRecommendationSection';
import ValueSection from '@/routes/home/_components/ValueSection';
import type { Route } from '.react-router/types/app/routes/home/+types';
import { meetingRecommendationsQueryOptions } from '@/features/meetings/hooks/useMeetingRecommendationsQuery';

export function meta() {
  return metaTemplates.home();
}

export async function loader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('likes', 'all'),
    ),
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('random', 'all'),
    ),
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('recent', 'all'),
    ),
  ]);

  const banner = await getBanner();
  const dehydratedState = dehydrate(queryClient);
  return { ...banner, dehydratedState };
}

export async function clientLoader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('likes', 'all'),
    ),
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('random', 'all'),
    ),
    queryClient.prefetchQuery(
      meetingRecommendationsQueryOptions('recent', 'all'),
    ),
  ]);

  const banner = await getBanner();
  const dehydratedState = dehydrate(queryClient);
  return { ...banner, dehydratedState };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { banners, dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeTemplate>
        <MainVisualSlider banners={banners} />
        <AboutSection />
        <MeetingRecommendationSection />
        <ValueSection />
      </HomeTemplate>
    </HydrationBoundary>
  );
}
