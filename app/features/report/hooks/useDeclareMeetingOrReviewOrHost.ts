import { useMutation, useQueryClient } from '@tanstack/react-query';
import { declareMeetingOrReviewOrHost } from '@/shared/api/endpoints/complaints';
import toast from 'react-hot-toast';
import { reviewQueryKeys } from '@/features/reviews/queries/queryKeys';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';
import { userQueryKeys } from '@/features/users/queries/queryKeys';

export interface DeclareModalPropsType {
  id: number;
  type: 'meeting' | 'review' | 'host';
  refetchKey: string;
}

export interface DeclareDataType {
  reasonType: string;
  description: string;
}

export default function useDeclareMeetingOrReviewOrHost(
  modalProps: DeclareModalPropsType,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeclareDataType) =>
      declareMeetingOrReviewOrHost(data, modalProps),
    onSuccess: () => {
      toast.success(
        `${modalProps.type === 'meeting' ? '해당 모임을' : modalProps.type === 'review' ? '해당 모임 후기를' : '해당 호스트를'} 신고하였습니다.`,
      );
      if (modalProps.type === 'review') {
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys._def,
        });
      }
      if (modalProps.type === 'meeting') {
        queryClient.invalidateQueries({
          queryKey: meetingQueryKeys._def,
        });
      }
      if (modalProps.type === 'host') {
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.host(modalProps.id).queryKey,
        });
      }
    },
    onError: (err) => {
      toast.error(
        `${modalProps.type === 'meeting' ? '해당 모임을' : modalProps.type === 'review' ? '해당 모임 후기를' : '해당 호스트를'} 신고를 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
