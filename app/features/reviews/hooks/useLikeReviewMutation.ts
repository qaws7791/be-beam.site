import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import { likeReview } from '@/shared/api/endpoints/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeReviewParams {
  reviewId: number;
}

export default function useLikeReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: LikeReviewParams) => likeReview({ reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys._def,
      });
    },
  });
}
