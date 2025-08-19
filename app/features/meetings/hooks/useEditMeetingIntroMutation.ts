import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { EditCreateMeetingIntroType } from '@/shared/types/components';
import toast from 'react-hot-toast';
import { EditMeetingIntro } from '@/shared/api/endpoints/users';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';

export default function useEditMeetingIntroMutation(
  id: number,
  existingImages: string[],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: EditCreateMeetingIntroType) =>
      EditMeetingIntro(id, form, existingImages),
    onSuccess: () => {
      toast.success('모임 수정을 완료하였습니다.');
      queryClient.invalidateQueries({
        queryKey: meetingQueryKeys.createdMeetingIntro._def,
      });
      close();
    },
    onError: (err) => {
      toast.error('모임 수정을 실패하였습니다. 다시 시도해주세요.');
      console.error('Meeting Edit failed:', err);
    },
  });
}
