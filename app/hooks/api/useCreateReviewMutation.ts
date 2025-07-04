import { createReview } from '@/api/reviews';
import { useMutation } from '@tanstack/react-query';

export default function useCreateReviewMutation() {
  return useMutation({
    mutationFn: createReview,
  });
}
