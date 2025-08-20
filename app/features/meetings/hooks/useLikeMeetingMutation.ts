import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import {
  likeMeeting,
  type MeetingListResult,
} from '@/shared/api/endpoints/meetings';

import toast from 'react-hot-toast';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';
import { searchQueryKeys } from '@/features/search/queries/queryKeys';
import type { SearchMeetingResult } from '@/shared/api/endpoints/searches';
import type { RecommendationMeetingsResult } from '@/shared/api/endpoints/home';

export default function useLikeMeetingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meeting: { id: number; liked: boolean }) =>
      likeMeeting(meeting),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: meetingQueryKeys._def,
      });

      const previousData = {
        list: queryClient.getQueriesData<
          InfiniteData<MeetingListResult> | undefined
        >({
          queryKey: meetingQueryKeys.list._def,
        }),
        search: queryClient.getQueriesData<
          InfiniteData<SearchMeetingResult> | undefined
        >({
          queryKey: searchQueryKeys.meetings._def,
        }),
        recommendedMeetings: queryClient.getQueriesData<
          RecommendationMeetingsResult | undefined
        >({
          queryKey: meetingQueryKeys.recommendedMeetings._def,
        }),
      };

      // list
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

      // search
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

      // recommendedMeetings
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
      if (context?.previousData.list) {
        queryClient.setQueriesData(
          {
            queryKey: meetingQueryKeys.list._def,
          },
          context.previousData.list,
        );
      }

      if (context?.previousData.search) {
        queryClient.setQueriesData(
          {
            queryKey: searchQueryKeys.meetings._def,
          },
          context.previousData.search,
        );
      }

      if (context?.previousData.recommendedMeetings) {
        queryClient.setQueriesData(
          {
            queryKey: meetingQueryKeys.recommendedMeetings._def,
          },
          context.previousData.recommendedMeetings,
        );
      }

      toast.error(
        `해당 모임의 ${variables.liked ? '좋아요 취소를' : '좋아요 누르는 것을'} 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
