import { getBanner } from '@/api/home';
import type { Route } from './+types/home';
import HomeTemplate from '@/components/templates/HomeTemplate';
import MainVisualSlider from '@/components/organisms/MainVisualSlider';
import AboutSection from '@/components/sections/AboutSection';
import MeetingRecommendationSection from '@/components/sections/MeetingRecommendationSection';
import ValueSection from '@/components/sections/ValueSection';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { meetingRecommendationQueryOptions } from '@/hooks/api/useMeetingRecommendationsQuery';

export function meta() {
  return [
    { title: '홈 화면입니다.' },
    {
      name: 'description',
      content: 'BE:BEAM 모임 커뮤니티에 오신 것을 환영합니다.',
    },
  ];
}

export async function loader() {
  const banner = await getBanner();

  const queryClient = new QueryClient();
  await Promise.all([
    // 좋아요 기반 추천 리스트
    queryClient.prefetchQuery(
      meetingRecommendationQueryOptions({ tab: 'all', type: 'likes' }),
    ),
    // 랜덤 추천 리스트
    queryClient.prefetchQuery(
      meetingRecommendationQueryOptions({ tab: 'all', type: 'random' }),
    ),
    // 최신 등록 모임 리스트
    queryClient.prefetchQuery(
      meetingRecommendationQueryOptions({ tab: 'all', type: 'recent' }),
    ),
  ]);

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
