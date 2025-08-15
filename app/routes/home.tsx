import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getBanner, getRecommendationMeeting } from '@/api/home';
import { metaTemplates } from '@/config/meta-templates';

import type { Route } from './+types/home';
import HomeTemplate from '@/components/templates/HomeTemplate';
import MainVisualSlider from '@/components/organisms/MainVisualSlider';
import AboutSection from '@/components/sections/AboutSection';
import MeetingRecommendationSection from '@/components/sections/MeetingRecommendationSection';
import ValueSection from '@/components/sections/ValueSection';

export function meta() {
  return metaTemplates.home();
}

export async function loader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'likes', 'all'],
      queryFn: () => getRecommendationMeeting('likes', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'random', 'all'],
      queryFn: () => getRecommendationMeeting('random', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'recent', 'all'],
      queryFn: () => getRecommendationMeeting('recent', 'all'),
    }),
  ]);

  const banner = await getBanner();
  const dehydratedState = dehydrate(queryClient);
  return { ...banner, dehydratedState };
}

export async function clientLoader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'likes', 'all'],
      queryFn: () => getRecommendationMeeting('likes', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'random', 'all'],
      queryFn: () => getRecommendationMeeting('random', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'recent', 'all'],
      queryFn: () => getRecommendationMeeting('recent', 'all'),
    }),
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
