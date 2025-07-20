import { queryClient } from '@/root';
import { useMutation } from '@tanstack/react-query';
import { breakawayMeeting } from '@/api/meetings';

import toast from 'react-hot-toast';

export default function useBreakawayMeetingMutation(
  id: number,
  refetchKey: string,
) {
  return useMutation({
    mutationFn: () => breakawayMeeting(id),
    onSuccess: () => {
      toast.success('모임 중도 이탈을 신청하였습니다.');
      queryClient.refetchQueries({ queryKey: [refetchKey] });
      close();
    },
    onError: (err) => {
      toast.error('모임 중도 이탈 신청을 실패하였습니다. 다시 시도해주세요.');
      console.error('Meeting breakaway failed:', err);
    },
  });
}
