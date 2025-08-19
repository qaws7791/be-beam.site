import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import { unlikeReview } from '@/shared/api/endpoints/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UnlikeReviewParams {
  reviewId: number;
}

export default function useUnlikeReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: UnlikeReviewParams) =>
      unlikeReview({ reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys._def,
      });
    },
  });
}
