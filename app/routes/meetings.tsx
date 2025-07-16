import { useMemo } from 'react';
import { queryClient } from '@/root';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {
  MeetingListFilterSchema,
  type MeetingListFilters,
} from '@/schemas/meetingFilters';
import { withOptionalAuth } from '@/lib/auth.server';
import { getMeetingList } from '@/api/meetings';
import { getTopics } from '@/api/topics';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import useMeetingsQuery from '@/hooks/api/useMeetingsQuery';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';
import { useModalStore } from '@/stores/useModalStore';

import type { Route } from './+types/meetings';
import type { Topic } from '@/types/entities';
import CommonTemplate from '@/components/templates/CommonTemplate';
import Banner from '@/components/atoms/Banner';
import MeetingFilterControls from '@/components/organisms/MeetingFilterControls';
import MeetingCardGroup from '@/components/sections/MeetingCardGroup';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import { Button } from '@/components/atoms/button/Button';

export async function loader({ request }: Route.LoaderArgs) {
  const authResult = await withOptionalAuth(request, async () => {
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

    queryClient.prefetchInfiniteQuery({
      queryKey: ['meetings', parsedFilters],
      queryFn: ({ pageParam }) =>
        getMeetingList(parsedFilters, pageParam, {
          headers: axiosRequestConfigHeaders,
        }),
      initialPageParam: 0,
    });

    const topics = await getTopics({
      headers: axiosRequestConfigHeaders,
    });

    return {
      filters: parsedFilters,
      topics,
    };
  });

  const loaderDataForComponent = authResult.data;
  const dehydratedState = dehydrate(queryClient);

  return { ...loaderDataForComponent, dehydratedState };
}

export default function Example({ loaderData }: Route.ComponentProps) {
  const { open } = useModalStore();

  const { data, dehydratedState, user } = loaderData;
  const initialFilters = data?.filters;
  const topics = data?.topics;

  const { filters: meetingFilters, setFilter } = useUrlFilters(
    MeetingListFilterSchema,
    initialFilters,
  );

  const {
    data: clientMeetings,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingsQuery(meetingFilters);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const meetings = useMemo(() => {
    return clientMeetings?.pages?.flatMap((page) => page.meetings) || [];
  }, [clientMeetings]);

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
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Banner imageUrl="/images/meeting_banner.png" height="h-[260px]" />

        <MeetingFilterControls
          topics={allTopics}
          meetingFilters={meetingFilters}
          setFilter={setFilter}
        />

        <MeetingCardGroup
          meetings={meetings}
          isLikedBtn={user ? true : false}
        />
        {(isLoading || isFetching || isFetchingNextPage) && <LoadingSpinner />}

        {user && (
          <Button
            className="fixed bottom-10 left-[50%] ml-[-75px] rounded-full text-t3"
            size="sm"
            onClick={() =>
              open('CREATE_MEETING_MODAL', { userRole: user.role })
            }
          >
            <img src="/images/icons/w_plus.svg" alt="plus_icon" />
            모임 만들기
          </Button>
        )}
      </CommonTemplate>
    </HydrationBoundary>
  );
}
