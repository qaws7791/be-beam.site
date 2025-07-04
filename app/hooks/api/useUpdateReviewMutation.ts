import { updateReview } from '@/api/reviews';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateReviewMutation() {
  return useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      toast.success('후기를 수정했어요');
    },
  });
}
