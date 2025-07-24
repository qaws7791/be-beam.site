import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import useCreatedMeetingParams from '@/hooks/business/useCreatedMeetingParams';
import usePagination from '@/hooks/ui/usePagination';
import { queryClient } from '@/root';
import { useModalStore } from '@/stores/useModalStore';
import axios from 'axios';
import { axiosInstance } from '@/lib/axios';
import type { FilterOption } from '@/types/components';
import { metaTemplates } from '@/config/meta-templates';
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

interface createdMeetingType {
  id: number;
  title: string;
  recruitmentType: string;
  status: string;
  address: string;
  meetingStartTime: string;
  image: string;
}

export function meta() {
  return metaTemplates.createdMeeting();
}

export default function CreatedMeeting() {
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
  const { params, handleUpdateType, handleUpdatePage } =
    useCreatedMeetingParams();
  const { open } = useModalStore();

  const { data: createdMeetings } = useQuery({
    queryKey: ['createdMeetings', params],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `/api/web/v2/users/opening-meetings?page=${params.page}&size=9&type=${params.type}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  const pagination = usePagination({
    currentPage: params.page,
    totalPages: createdMeetings?.pageInfo?.totalPages || 1,
  });

  const { mutate: deleteMeeting, isPending } = useMutation({
    mutationFn: (meetingId: number) => {
      return axiosInstance({
        method: 'DELETE',
        url: `/meetings/${meetingId}`,
      });
    },
    onSuccess: () => {
      toast.success('모임을 삭제하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['createdMeetings'] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });

  return (
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
        value={params.type}
        onValueChange={handleUpdateType}
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
              {createdMeetings?.meetings?.map((meeting: createdMeetingType) => (
                <MeetingCard
                  key={meeting.id}
                  image={meeting.image}
                  meetingType={meeting.recruitmentType}
                  recruitmentType={meeting.status}
                  name={meeting.title}
                  meetingStartTime={meeting.meetingStartTime}
                  address={meeting.address}
                  onClick={() =>
                    navigate(`/myPage/created/${meeting.id}/intro`)
                  }
                  isLikeBtn={false}
                >
                  {meeting.status !== '모집종료' &&
                    meeting.status !== '모임중' &&
                    meeting.status !== '모임종료' && (
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
