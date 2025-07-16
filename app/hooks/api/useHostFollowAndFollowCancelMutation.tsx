import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { queryClient } from '@/root';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useHostFollowAndFollowCancelMutation(
  method: 'POST' | 'DELETE',
) {
  return useMutation({
    mutationFn: () => {
      return axiosInstance({
        baseURL: API_V1_BASE_URL,
        method: method,
        // url: `/follows/${id}`,
        url: '/follows/1', // 현재 서버에 id 1의 호스트만 있으므로
      });
    },
    onSuccess: () => {
      toast.success(
        method === 'POST'
          ? '호스트를 팔로우하였습니다.'
          : '호스트 팔로우를 취소하였습니다.',
      );
      queryClient.invalidateQueries({ queryKey: ['hostDetail'] });
      close();
    },
    onError: (err) => {
      toast.error(
        `${method === 'POST' ? '호스트 팔로우를 실패하였습니다.' : '호스트 팔로우 취소를 실패하였습니다.'} 다시 시도해주세요.`,
      );
      console.error('Failed to follow host:', err);
    },
  });
}
