import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { cancelMeeting } from '@/api/meetings';

export default function useCancelMeetingMutation(
  id: number,
  refetchKey: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { reasonType: string; description: string }) =>
      cancelMeeting(data, id),
    onSuccess: () => {
      toast.success('모임 취소 신청을 신청하였습니다.');
      queryClient.refetchQueries({ queryKey: [refetchKey] });
      close();
    },
    onError: (err) => {
      toast.error('모임 취소 신청을 실패하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });
}
