import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useRequestMeetingParams from '@/hooks/business/useRequestMeetingParams';
import { useModalStore } from '@/stores/useModalStore';
import usePagination from '@/hooks/ui/usePagination';

import type { FilterOption } from '@/types/components';
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs/Tabs';
import Text from '@/components/atoms/text/Text';
import GridGroup from '@/components/organisms/gridGroup/GridGroup';
import MeetingCard from '@/components/organisms/MeetingCard';
import { TabsContent } from '@radix-ui/react-tabs';
import MoreDropdownMenu from '@/components/organisms/MoreDropdownMenu';
import { DropdownMenuItem } from '@/components/atoms/dropdown-menu/DropdownMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import toast from 'react-hot-toast';
import { API_V2_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { MyPageMeetingSummary } from '@/types/entities';

export default function RequestedMeeting() {
  const statusList: FilterOption[] = [
    {
      text: '신청중',
      value: 'applied',
    },
    {
      text: '승인',
      value: 'confirmed',
    },
    {
      text: '거절',
      value: 'rejected',
    },
  ];

  const navigate = useNavigate();
  const { open } = useModalStore();
  const { params, handleUpdateStatus, handleUpdatePage } =
    useRequestMeetingParams();

  const { data: requestMeetings } = useQuery({
    queryKey: ['requestMeetings', params],
    queryFn: async () => {
      const res = await axiosInstance({
        method: 'GET',
        baseURL: API_V2_BASE_URL,
        url: `/users/meetings/application?status=${params.status}&size=9&page=${params.page}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  const pagination = usePagination({
    currentPage: params.page,
    totalPages: requestMeetings?.pageInfo?.totalPages || 1,
  });

  return (
    <div className="flex-1">
      <div className="w-full">
        <Text variant="H2_Semibold" className="mb-3">
          신청 모임
        </Text>
        <Text variant="B2_Medium" color="gray-600" className="mb-16">
          내가 신청 중인 모임을 한눈에 확인 할 수 있어요.
        </Text>
      </div>

      <Tabs
        defaultValue="applied"
        className="text-b1"
        value={params.status}
        onValueChange={handleUpdateStatus}
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
              {requestMeetings?.meetings?.map(
                (meeting: MyPageMeetingSummary) => (
                  <MeetingCard
                    key={meeting.id}
                    image={meeting.thumbnailImage}
                    recruitmentType={meeting.recruitmentType}
                    recruitmentStatus={meeting.recruitmentStatus}
                    name={meeting.name}
                    meetingStartTime={meeting.meetingStartTime}
                    address={meeting.address}
                    onClick={() => navigate(`/meeting/${meeting.id}`)}
                    isLikeBtn={false}
                  >
                    {requestMeetings?.status !== 'rejected' && (
                      <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                        <DropdownMenuItem
                          onSelect={() =>
                            open('CONFIRM_DIALOG', {
                              title: '신청 중인 모임을 취소할까요?',
                              handleClickCancel: () =>
                                toast('모임 취소 신청을 취소하였습니다.'),
                              handleClickAction: (
                                e: React.MouseEvent<HTMLButtonElement>,
                              ) => {
                                e.preventDefault();
                                open('CANCEL_MEETING_MODAL', {
                                  meetingId: meeting.id,
                                  statusType: params.status,
                                  refetchKey: 'requestMeetings',
                                });
                              },
                            })
                          }
                        >
                          모임 취소하기
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
  );
}
