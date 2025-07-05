// 페이지 && Smart 컴포넌트: 기능 중심

import { useMemo, useState } from 'react';
import useMeetingsQuery from '@/hooks/api/useMeetingsQuery';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';
import { getInitialFilters } from '@/utils/filter';

import CommonTemplate from '@/components/templates/CommonTemplate';
import Banner from '@/components/atoms/Banner';
import MeetingFilterControls from '@/components/organisms/MeetingFilterControls';
import MeetingCardGroup from '@/components/sections/MeetingCardGroup';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import useMyProfileQuery from '@/hooks/api/useMyProfileQuery';
import { Button } from '@/components/atoms/button/Button';
import type { Route } from './+types/meetings';
import { withOptionalAuth } from '@/lib/auth.server';

export function meta() {
  return [
    { title: '모임 페이지' },
    { name: 'description', content: '모임을 생성하거나 모임에 참여하세요!' },
  ];
}

// export async function loader() {
// 서버에서 미리 데이터를 가져와서 해당 쿼리 캐시에 저장
// 실제 api를 사용하게 되면 HydrationBoundary와 함께 사용
// await queryClient.prefetchQuery({
//   queryKey: [
//     'meetings',
//     '',
//     'all',
//     {
//       '모임 유형': 'all',
//       '모집 상태': 'all',
//       '모임 방식': 'all',
//       참가비: 'all',
//       정렬: 'recent',
//     },
//   ],
//   queryFn: () => getMeetingList(),
// });

// return {
//   dehydratedState: dehydrate(queryClient),
// };
// }

export async function loader({ request }: Route.LoaderArgs) {
  return withOptionalAuth(request, async () => {
    return {};
  });
}

export default function Meetings({ loaderData }: Route.ComponentProps) {
  // const { dehydratedState } = loaderData;
  const user = loaderData.user;
  console.log(user);

  const myProfile = useMyProfileQuery();
  console.log(myProfile.data);

  const filters = [
    {
      label: '모임 유형',
      options: ['전체', '정기모임', '소모임'],
      values: ['all', 'reg', 'small'],
    },
    {
      label: '모집 상태',
      options: ['전체', '모집예정', '모집중', '모집종료', '모임중', '모임완료'],
      values: [
        'all',
        'upcoming',
        'recruiting',
        'closed',
        'in_progress',
        'completed',
      ],
    },
    {
      label: '모임 방식',
      options: ['전체', '오프라인', '온라인', '혼합'],
      values: ['all', 'offline', 'online', 'mix'],
    },
    {
      label: '참가비',
      options: ['전체', '무료', '유료'],
      values: ['all', 'free', 'cash'],
    },
    {
      label: '정렬',
      options: ['최신순', '좋아요순'],
      values: ['recent', 'likes'],
    },
  ];

  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >(() => getInitialFilters(filters));
  const [search, setSearch] = useState('');

  const {
    isLoading,
    data: meetings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingsQuery(search, selectedTopic, selectedFilters);

  const allMeetings = useMemo(() => {
    return meetings?.pages?.flatMap((page) => page.meetings) || [];
  }, [meetings]);

  // 스크롤 감지 기능은 별도의 관심사. 커스텀 훅으로 분리
  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  console.log(selectedFilters);
  console.log('allMeetings', allMeetings);
  console.log('datas', meetings);

  return (
    <CommonTemplate>
      {/* { <HydrationBoundary state={dehydratedState}></HydrationBoundary>} */}
      <Banner
        imageUrl="https://i.pinimg.com/736x/20/92/e7/2092e79552015eb068a6870f76fbaf88.jpg"
        height="h-[260px]"
      />

      <MeetingFilterControls
        filters={filters}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        search={search}
        setSearch={setSearch}
      />

      <MeetingCardGroup meetings={allMeetings} />

      {isLoading && <LoadingSpinner />}

      {isFetchingNextPage && (
        <LoadingSpinner loadingComment="더 많은 미팅을 Loading..." />
      )}

      {user && (
        <Button
          className="fixed bottom-10 left-[50%] ml-[-75px] rounded-full text-t3"
          size="sm"
        >
          <img src="/images/icons/w_plus.svg" alt="plus_icon" />
          모임 만들기
        </Button>
      )}
    </CommonTemplate>
  );
}
