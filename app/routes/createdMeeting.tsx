import { useNavigate } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
  type DehydratedState,
} from '@tanstack/react-query';
import usePagination from '@/hooks/ui/usePagination';
import { useModalStore } from '@/stores/useModalStore';
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
import { requireAuth } from '@/lib/auth.server';
import type { Route } from './+types/createdMeeting';
import {
  MyCreatedMeetingFilterSchema,
  type MyCreatedMeetingFilters,
} from '@/schemas/userFilters';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import { useCallback } from 'react';
import { getOpeningMeetingList, type MyPageMeetingResult } from '@/api/users';
import useDeleteMeetingMutation from '@/hooks/api/useDeleteMeetingMutation';

export function meta() {
  return [
    { title: '내가 개설한 모임 페이지 입니다.' },
    {
      name: 'description',
      content: '내가 개설한 모임을 한눈에 확인 할 수 있어요.',
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
  const parsedFilters: MyCreatedMeetingFilters =
    MyCreatedMeetingFilterSchema.parse({
      ...rawFilters,
    });

  await queryClient.prefetchQuery({
    queryKey: ['createdMeetings', parsedFilters],
    queryFn: () => getOpeningMeetingList(parsedFilters),
  });

  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function CreatedMeeting({ loaderData }: Route.ComponentProps) {
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyCreatedMeetingFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyCreatedMeetingFilterSchema,
    initialFilters,
  );

  const statusList: FilterOption[] = [
    {
      text: '정기모임',
      value: 'regular',
    },
    {
      text: '소모임',
      value: 'small',
    },
  ];

  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: createdMeetings } = useQuery({
    queryKey: ['createdMeetings', filters],
    queryFn: () => getOpeningMeetingList(filters),
  });

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: createdMeetings?.pageInfo?.totalPages || 1,
  });

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyCreatedMeetingFilters = filters;
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

  const { mutate: deleteMeeting, isPending } = useDeleteMeetingMutation();

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className="w-full">
          <Text variant="H2_Semibold" className="mb-3">
            내가 개설한 모임
          </Text>
          <Text variant="B2_Medium" color="gray-600" className="mb-16">
            내가 개설한 모임을 한눈에 확인 할 수 있어요.
          </Text>
        </div>

        <Tabs
          defaultValue="regular"
          className="text-b1"
          value={filters.type}
          onValueChange={(value) =>
            setFilter({
              type: value as 'regular' | 'small',
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
                {createdMeetings?.meetings?.map(
                  (meeting: MyPageMeetingResult) => (
                    <MeetingCard
                      key={meeting.id}
                      image={meeting.thumbnailImage}
                      recruitmentType={meeting.recruitmentType}
                      recruitmentStatus={meeting.recruitmentStatus}
                      name={meeting.name}
                      meetingStartTime={meeting.meetingStartTime}
                      address={meeting.address}
                      onClick={() =>
                        navigate(`/myPage/created/${meeting.id}/intro`)
                      }
                      isLikeBtn={false}
                    >
                      {meeting.recruitmentStatus !== '모집마감' &&
                        meeting.recruitmentStatus !== '모임중' &&
                        meeting.recruitmentStatus !== '모임완료' && (
                          <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                            <DropdownMenuItem
                              onSelect={() => {
                                open('CONFIRM_DIALOG', {
                                  title: `개설한 ${meeting?.recruitmentType}을 삭제할까요?`,
                                  handleClickCancel: () =>
                                    toast(
                                      `${meeting?.recruitmentType} 삭제를 취소하였습니다.`,
                                    ),
                                  handleClickAction: () => {
                                    if (isPending) return;
                                    deleteMeeting(meeting.id);
                                  },
                                });
                              }}
                            >
                              모임 삭제하기
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
