import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import {
  likeMeeting,
  type MeetingDetailResult,
  type MeetingListResult,
} from '@/shared/api/endpoints/meetings';

import toast from 'react-hot-toast';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';
import { searchQueryKeys } from '@/features/search/queries/queryKeys';
import type { SearchMeetingResult } from '@/shared/api/endpoints/searches';
import type { RecommendationMeetingsResult } from '@/shared/api/endpoints/home';
import { useRouteLoaderData } from 'react-router';

export default function useLikeMeetingMutation() {
  const queryClient = useQueryClient();
  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData?.user;

  return useMutation({
    mutationFn: (meeting: { id: number; liked: boolean }) =>
      likeMeeting(meeting),

    onMutate: async (variables) => {
      if (!user) {
        return {
          previousData: {
            list: undefined,
            detail: undefined,
            search: undefined,
            recommendedMeetings: undefined,
          },
        };
      }

      await queryClient.cancelQueries({
        queryKey: meetingQueryKeys._def,
      });

      const listData = queryClient.getQueriesData<
        InfiniteData<MeetingListResult> | undefined
      >({
        queryKey: meetingQueryKeys.list._def,
      });

      const detailData = queryClient.getQueriesData<
        MeetingDetailResult | undefined
      >({
        queryKey: meetingQueryKeys.detail._def,
      });

      const searchData = queryClient.getQueriesData<
        InfiniteData<SearchMeetingResult> | undefined
      >({
        queryKey: searchQueryKeys.meetings._def,
      });

      const recommendedMeetingsData = queryClient.getQueriesData<
        RecommendationMeetingsResult | undefined
      >({
        queryKey: meetingQueryKeys.recommendedMeetings._def,
      });

      const previousData = {
        list: listData[0]?.[1],
        detail: detailData[0]?.[1],
        search: searchData[0]?.[1],
        recommendedMeetings: recommendedMeetingsData[0]?.[1],
      };

      queryClient.setQueriesData<InfiniteData<MeetingListResult | undefined>>(
        {
          queryKey: meetingQueryKeys.list._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (!page) return page;
              return {
                ...page,
                meetings: page.meetings.map((meeting) => {
                  if (meeting.id === variables.id) {
                    return {
                      ...meeting,
                      liked: !meeting.liked,
                    };
                  }
                  return meeting;
                }),
              };
            }),
          };
        },
      );

      queryClient.setQueriesData<MeetingDetailResult | undefined>(
        {
          queryKey: meetingQueryKeys.detail._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          if (oldData.id === variables.id) {
            return {
              ...oldData,
              liked: !oldData.liked,
              likesCount: oldData.liked
                ? oldData.likesCount - 1
                : oldData.likesCount + 1,
            };
          }
          return oldData;
        },
      );

      queryClient.setQueriesData<InfiniteData<SearchMeetingResult | undefined>>(
        {
          queryKey: searchQueryKeys.meetings._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (!page) return page;
              return {
                ...page,
                meetings: page.meetings.map((meeting) => {
                  if (meeting.id === variables.id) {
                    return {
                      ...meeting,
                      liked: !meeting.liked,
                    };
                  }
                  return meeting;
                }),
              };
            }),
          };
        },
      );

      queryClient.setQueriesData<RecommendationMeetingsResult | undefined>(
        {
          queryKey: meetingQueryKeys.recommendedMeetings._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((meeting) => {
            if (meeting.id === variables.id) {
              return {
                ...meeting,
                liked: !meeting.liked,
              };
            }
            return meeting;
          });
        },
      );

      return { previousData };
    },

    onSuccess: (_, variables) => {
      toast.success(
        `해당 모임의 ${variables.liked ? '좋아요를 취소하였습니다.' : ' 좋아요를 눌렀습니다.'}`,
      );

      Promise.all([
        queryClient.invalidateQueries({
          queryKey: meetingQueryKeys.appliedMeetings._def,
        }),
        queryClient.invalidateQueries({
          queryKey: meetingQueryKeys.participatedMeetings._def,
        }),
        queryClient.invalidateQueries({
          queryKey: meetingQueryKeys.likedMeetings._def,
        }),
        queryClient.invalidateQueries({
          queryKey: searchQueryKeys.total._def,
        }),
      ]);
    },

    onError: (err, variables, context) => {
      if (!context) return;

      const { previousData } = context;

      if (previousData.list) {
        queryClient.setQueriesData(
          {
            queryKey: meetingQueryKeys.list._def,
          },
          previousData.list,
        );
      }

      if (previousData.detail) {
        queryClient.setQueriesData(
          {
            queryKey: meetingQueryKeys.detail._def,
          },
          previousData.detail,
        );
      }

      if (previousData.search) {
        queryClient.setQueriesData(
          {
            queryKey: searchQueryKeys.meetings._def,
          },
          previousData.search,
        );
      }

      if (previousData.recommendedMeetings) {
        queryClient.setQueriesData(
          {
            queryKey: meetingQueryKeys.recommendedMeetings._def,
          },
          previousData.recommendedMeetings,
        );
      }

      toast.error(
        `해당 모임의 ${variables.liked ? '좋아요 취소를' : '좋아요 누르는 것을'} 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
