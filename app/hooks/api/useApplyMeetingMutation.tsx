import { queryClient } from '@/root';
import { useMutation } from '@tanstack/react-query';
import { applyMeeting } from '@/api/meetings';

import toast from 'react-hot-toast';

export default function useApplyMeetingMutation(id: number) {
  return useMutation({
    mutationFn: (data: { joinReason: string }) => applyMeeting(id, data),
    onSuccess: () => {
      toast.success('모임 참여 신청을 하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['meeting'] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });
}
