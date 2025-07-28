import { useNavigate } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
  type DehydratedState,
} from '@tanstack/react-query';
import { useModalStore } from '@/stores/useModalStore';
import usePagination from '@/hooks/ui/usePagination';
import { requireAuth } from '@/lib/auth.server';

import type { Route } from './+types/participatedMeeting';
import type { FilterOption } from '@/types/components';
import { DropdownMenuItem } from '@/components/atoms/dropdown-menu/DropdownMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import Text from '@/components/atoms/text/Text';
import GridGroup from '@/components/organisms/gridGroup/GridGroup';
import MeetingCard from '@/components/organisms/MeetingCard';
import MoreDropdownMenu from '@/components/organisms/MoreDropdownMenu';
import toast from 'react-hot-toast';
import {
  MyParticipatedMeetingFilterSchema,
  type MyParticipatedMeetingFilters,
} from '@/schemas/userFilters';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import { useCallback } from 'react';
import {
  getParticipationMeetingList,
  type MyPageMeetingResult,
} from '@/api/users';

export function meta() {
  return [
    { title: '내가 참여한 모임 페이지 입니다.' },
    {
      name: 'description',
      content: '내가 참여 중인 모임을 한눈에 확인 할 수 있어요.',
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyParticipatedMeetingFilters =
    MyParticipatedMeetingFilterSchema.parse({
      ...rawFilters,
    });

  await queryClient.prefetchQuery({
    queryKey: ['participatedMeetings', parsedFilters],
    queryFn: () => getParticipationMeetingList(parsedFilters),
  });

  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function ParticipatedMeeting({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyParticipatedMeetingFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyParticipatedMeetingFilterSchema,
    initialFilters,
  );
  const { open } = useModalStore();

  const meetingStatus =
    filters.status === 'participating'
      ? '참여중'
      : filters.status === 'completed'
        ? '참여완료'
        : '취소';

  const { data: participatedMeetings } = useQuery({
    queryKey: ['participatedMeetings', filters],
    queryFn: () => getParticipationMeetingList(filters),
  });

  console.log('participatedMeetings', participatedMeetings);

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: participatedMeetings?.pageInfo?.totalPages || 1,
  });

  const statusList: FilterOption[] = [
    {
      text: '참여중',
      value: 'participating',
    },
    {
      text: '참여 완료',
      value: 'completed',
    },
    {
      text: '취소',
      value: 'cancelled',
    },
  ];

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyParticipatedMeetingFilters = filters;
      const updatedFilters = { ...currentFilters, page: page };
      const newSearchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(updatedFilters)) {
        if (value !== undefined && value !== null) {
          newSearchParams.set(key, value.toString());
        }
      }

      return newSearchParams.toString();
    },
    [filters],
  );

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className="w-full">
          <Text variant="H2_Semibold" className="mb-3">
            참여 모임
          </Text>
          <Text variant="B2_Medium" color="gray-600" className="mb-16">
            내가 참여 중인 모임을 한눈에 확인 할 수 있어요.
          </Text>
        </div>

        <Tabs
          defaultValue="participating"
          className="text-b1"
          value={filters.status}
          onValueChange={(value) =>
            setFilter({
              status: value as 'participating' | 'completed' | 'cancelled',
              page: 1,
            })
          }
        >
          <TabsList className="h-auto gap-4 before:h-0">
            {statusList.map((type, idx) => (
              <TabsTrigger
                key={idx}
                className="h-auto cursor-pointer rounded-full bg-gray-200 px-4 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value={type.value}
              >
                {type.text}
              </TabsTrigger>
            ))}
          </TabsList>

          {statusList.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-10 w-full"
            >
              <GridGroup columns={3} gap={5}>
                {participatedMeetings?.meetings?.map(
                  (meeting: MyPageMeetingResult) => (
                    <MeetingCard
                      key={meeting.id}
                      image={meeting.thumbnailImage}
                      recruitmentType={meeting.recruitmentType}
                      recruitmentStatus={meetingStatus}
                      name={meeting.name}
                      meetingStartTime={meeting.meetingStartTime}
                      address={meeting.address}
                      onClick={() => navigate(`/meeting/${meeting.id}`)}
                      isLikeBtn={false}
                    >
                      {filters.status === 'participating' && (
                        <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                          <DropdownMenuItem
                            onSelect={() =>
                              open('CONFIRM_DIALOG', {
                                title: '참여 중인 모임을 중도 이탈할까요?',
                                handleClickCancel: () =>
                                  toast(
                                    '모임 중도 이탈 신청을 취소하였습니다.',
                                  ),
                                handleClickAction: (
                                  e: React.MouseEvent<HTMLButtonElement>,
                                ) => {
                                  e.preventDefault();
                                  open('CANCEL_MEETING_MODAL', {
                                    meetingId: meeting.id,
                                    statusType: filters.status,
                                  });
                                },
                              })
                            }
                          >
                            모임 중도 이탈하기
                          </DropdownMenuItem>
                        </MoreDropdownMenu>
                      )}
                    </MeetingCard>
                  ),
                )}
              </GridGroup>

              <Pagination className="mt-20">
                <PaginationContent>
                  {pagination.hasPreviousPage && (
                    <PaginationPrevious
                      to={{
                        search: handleUpdatePage(
                          Number(pagination.currentPage) - 1,
                        ),
                      }}
                    />
                  )}
                  {pagination.pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === Number(pagination.currentPage)}
                        to={{
                          search: handleUpdatePage(page),
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {pagination.hasNextPage && (
                    <PaginationNext
                      to={{
                        search: handleUpdatePage(
                          Number(pagination.currentPage) + 1,
                        ),
                      }}
                    />
                  )}
                </PaginationContent>
              </Pagination>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HydrationBoundary>
  );
}
