import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useRequestMeetingParams from '@/hooks/business/useRequestMeetingParams';
import { useModalStore } from '@/stores/useModalStore';
import usePagination from '@/hooks/ui/usePagination';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.requestedMeeting();
}

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

interface requestMeetingType {
  id: number;
  name: string;
  recruitmentStatus: string;
  address: string;
  status: string;
  image: string;
  meetingStartTime: string;
  recruitmentType: string;
  isCash: boolean;
  liked: boolean;
}

export default function RequestedMeeting() {
  const statusList: FilterOption[] = [
    {
      text: '신청중',
      value: 'pending',
    },
    {
      text: '승인',
      value: 'approved',
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
      const res = await axios({
        method: 'GET',
        url: `/api/web/v1/mypage/meetings/applications?status=${params.status}&size=9&page=${params.page}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  const pagination = usePagination({
    currentPage: params.page,
    totalPages: requestMeetings?.pageInfo?.totalPages || 1,
  });

  console.log('requestMeetings', requestMeetings);

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
        defaultValue="pending"
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
              {requestMeetings?.meetings?.map((meeting: requestMeetingType) => (
                <MeetingCard
                  key={meeting.id}
                  image={meeting.image}
                  meetingType={meeting.recruitmentType}
                  recruitmentType={meeting.recruitmentStatus}
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
                                isCash: meeting.isCash,
                                statusType: meeting?.status,
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
              ))}
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
