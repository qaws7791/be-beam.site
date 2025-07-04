import { updateMyProfile } from '@/api/users';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: updateMyProfile,
  });
}
