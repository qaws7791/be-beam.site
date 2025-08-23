import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import type { MeetingReviewsResult } from '@/shared/api/endpoints/meetingReviews';
import {
  unlikeReview,
  type ReviewListResult,
} from '@/shared/api/endpoints/reviews';
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

interface UnlikeReviewParams {
  reviewId: number;
}

export default function useUnlikeReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId }: UnlikeReviewParams) =>
      unlikeReview({ reviewId }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: reviewQueryKeys._def,
      });

      const previousData = {
        list: queryClient.getQueriesData<
          InfiniteData<ReviewListResult> | undefined
        >({
          queryKey: reviewQueryKeys.list._def,
        }),
        meetingReviews: queryClient.getQueriesData<
          InfiniteData<MeetingReviewsResult> | undefined
        >({
          queryKey: reviewQueryKeys.meetingReviews._def,
        }),
      };

      // list
      queryClient.setQueriesData<InfiniteData<ReviewListResult | undefined>>(
        {
          queryKey: reviewQueryKeys.list._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (!page) return page;
              return {
                ...page,
                reviews: page.reviews.map((review) => {
                  console.log(review.reviewId, variables.reviewId);
                  if (review.reviewId === variables.reviewId) {
                    return {
                      ...review,
                      liked: !review.liked,
                      likesCount: review.likesCount - 1,
                    };
                  }
                  return review;
                }),
              };
            }),
          };
        },
      );

      // meetingReviews
      queryClient.setQueriesData<
        InfiniteData<MeetingReviewsResult | undefined>
      >(
        {
          queryKey: reviewQueryKeys.meetingReviews._def,
        },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (!page) return page;
              return {
                ...page,
                reviews: page.reviews.map((review) => {
                  console.log(review.reviewId, variables.reviewId);
                  if (review.reviewId === variables.reviewId) {
                    return {
                      ...review,
                      liked: !review.liked,
                      likesCount: review.likesCount - 1,
                    };
                  }
                  return review;
                }),
              };
            }),
          };
        },
      );

      return { previousData };
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.likedReviews._def,
        }),
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.writtenReviews._def,
        }),
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.reviewableReviews._def,
        }),
      ]);
    },
    onError: (_, __, context) => {
      if (context?.previousData.list) {
        queryClient.setQueriesData(
          {
            queryKey: reviewQueryKeys.list._def,
          },
          context.previousData.list,
        );
      }

      if (context?.previousData.meetingReviews) {
        queryClient.setQueriesData(
          {
            queryKey: reviewQueryKeys.meetingReviews._def,
          },
          context.previousData.meetingReviews,
        );
      }
    },
  });
}
