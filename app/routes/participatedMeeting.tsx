import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useModalStore } from '@/stores/useModalStore';
import useParticipatedMeetingParams from '@/hooks/business/useParticipatedMeetingParams';
import usePagination from '@/hooks/ui/usePagination';

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

interface participatedMeetingType {
  address: string;
  id: number;
  image: string;
  meetingStartTime: string;
  recruitmentType: string;
  status: string;
  title: string;
  isCash: boolean;
}

export default function ParticipatedMeeting() {
  const navigate = useNavigate();

  const { params, handleUpdateStatus, handleUpdatePage } =
    useParticipatedMeetingParams();
  const { open } = useModalStore();

  const meetingStatus =
    params.status === 'participating'
      ? '참여중'
      : params.status === 'completed'
        ? '참여완료'
        : '취소';

  const { data: participatedMeetings } = useQuery({
    queryKey: ['participatedMeetings', params],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `/api/web/v2/users/participation-meetings?page=${params.page}&size=9&status=${params.status}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  const pagination = usePagination({
    currentPage: params.page,
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

  return (
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
              {participatedMeetings?.meetings?.map(
                (meeting: participatedMeetingType) => (
                  <MeetingCard
                    key={meeting.id}
                    image={meeting.image}
                    meetingType={meeting.recruitmentType}
                    recruitmentType={meetingStatus}
                    name={meeting.title}
                    meetingStartTime={meeting.meetingStartTime}
                    address={meeting.address}
                    onClick={() => navigate(`/meeting/${meeting.id}`)}
                    isLikeBtn={false}
                  >
                    {params.status === 'participating' && (
                      <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                        <DropdownMenuItem
                          onSelect={() =>
                            open('CONFIRM_DIALOG', {
                              title: '참여 중인 모임을 중도 이탈할까요?',
                              handleClickCancel: () =>
                                toast('모임 중도 이탈 신청을 취소하였습니다.'),
                              handleClickAction: (
                                e: React.MouseEvent<HTMLButtonElement>,
                              ) => {
                                e.preventDefault();
                                open('CANCEL_MEETING_MODAL', {
                                  meetingId: meeting.id,
                                  isCash: meeting.isCash,
                                  statusType: meeting?.status,
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
  );
}
