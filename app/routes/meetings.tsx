// 페이지 && Smart 컴포넌트: 기능 중심

import { useMemo } from 'react';
import { getMeetingList } from '@/api/meetings';
import { getTopics } from '@/api/topics';
import {
  MeetingListFilterSchema,
  type MeetingListFilters,
} from '@/schemas/meetingFilters';
import useMeetingsQuery from '@/hooks/api/useMeetingsQuery';
import { useModalStore } from '@/stores/useModalStore';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';
import { withOptionalAuth } from '@/lib/auth.server';

import type { Route } from './+types/meetings';
import type { Topic } from '@/types/entities';
import CommonTemplate from '@/components/templates/CommonTemplate';
import Banner from '@/components/atoms/Banner';
import MeetingCardGroup from '@/components/sections/MeetingCardGroup';
import { Button } from '@/components/atoms/button/Button';
import MeetingFilterControls from '@/components/organisms/MeetingFilterControls';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

export function meta() {
  return [
    { title: '모임 페이지' },
    { name: 'description', content: '모임을 생성하거나 모임에 참여하세요!' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return withOptionalAuth(request, async ({ user }) => {
    const url = new URL(request.url);
    const urlSearchParams = new URLSearchParams(url.search);

    const rawFilters = Object.fromEntries(urlSearchParams.entries());

    const parsedFilters: MeetingListFilters = MeetingListFilterSchema.parse({
      ...rawFilters,
    });

    const cookiesHeaderFromBrowser = request.headers.get('Cookie');

    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    const meetings = await getMeetingList(parsedFilters, 0, {
      headers: axiosRequestConfigHeaders,
    });

    const topics = await getTopics({
      headers: axiosRequestConfigHeaders,
    });

    return {
      meetings: meetings,
      filters: parsedFilters,
      user: user,
      topics: topics,
    };
  });
}

export default function Meetings({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  const user = data?.user;
  const initialMeetings = data?.meetings ?? null;
  const initialFilters = data?.filters;
  const topics = data?.topics;

  const { open } = useModalStore();

  const { filters: meetingFilters, setFilter } = useUrlFilters(
    MeetingListFilterSchema,
    initialFilters,
  );

  const {
    data: datas,
    isLoading: isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingsQuery(meetingFilters);

  const clientMeetings = useMemo(() => {
    return datas?.pages?.flatMap((page) => page.meetings) || [];
  }, [datas]);

  const meetings = clientMeetings || initialMeetings?.meetings || [];

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const allTopics = useMemo(() => {
    const defaultAllOption = { label: '전체', value: 'all' };

    if (topics && topics.length > 0) {
      const apiTopics = topics.map((item: Topic) => ({
        label: item.topic,
        value: String(item.topic),
      }));
      return [defaultAllOption, ...apiTopics];
    }

    return [defaultAllOption];
  }, [topics]);

  return (
    <CommonTemplate>
      <Banner imageUrl="/images/meeting_banner.png" height="h-[260px]" />

      <MeetingFilterControls
        topics={allTopics}
        meetingFilters={meetingFilters}
        setFilter={setFilter}
      />

      <MeetingCardGroup meetings={meetings} isLikedBtn={user ? true : false} />
      {isLoading ||
        isFetching ||
        (isFetchingNextPage && (
          <LoadingSpinner loadingComment="미팅을 불러오는 중..." />
        ))}

      {user && (
        <Button
          className="fixed bottom-10 left-[50%] ml-[-75px] rounded-full text-t3"
          size="sm"
          onClick={() => open('CREATE_MEETING_MODAL', { userRole: user.role })}
        >
          <img src="/images/icons/w_plus.svg" alt="plus_icon" />
          모임 만들기
        </Button>
      )}
    </CommonTemplate>
  );
}
