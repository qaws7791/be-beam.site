import { axiosInstanceV1 } from '@/lib/axios';
import type { APIResponse } from '@/types/api';

export type MyProfileResult = {
  nickname: string;
  profileImage: string;
  introduction: string;
};

export const getMyProfile = () => {
  return axiosInstanceV1
    .get<APIResponse<MyProfileResult>>('users/my-profile')
    .then((res) => {
      return res.data.result;
    });
};
