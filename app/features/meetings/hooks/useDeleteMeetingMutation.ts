import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteMeeting } from '@/shared/api/endpoints/meetings';

import toast from 'react-hot-toast';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';

export default function useDeleteMeetingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: number) => DeleteMeeting(meetingId),
    onSuccess: () => {
      toast.success('모임을 삭제하였습니다.');
      queryClient.invalidateQueries({
        queryKey: meetingQueryKeys.createdMeetings._def,
      });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });
}
