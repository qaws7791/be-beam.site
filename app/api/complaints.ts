import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';
import type {
  DeclareDataType,
  DeclareModalPropsType,
} from '@/hooks/api/useDeclareMeetingOrReviewOrHost';

interface ReportComplaintParams {
  complaintId: number;
  complaintType: 'REVIEW' | 'USER' | 'MEETING';
  reasonType:
    | 'ADVERTISEMENT'
    | 'SEXUAL'
    | 'PERSONAL_ATTACKS'
    | 'COMMERCIAL'
    | 'SPAM'
    | 'SPYWARE'
    | 'PRIVACY_VIOLATION'
    | 'OTHER';
  description: string;
}

export const reportComplaint = async (params: ReportComplaintParams) => {
  return;
  const res = await axiosInstance.post('/complaints', params, {
    baseURL: API_V1_BASE_URL,
  });
  return res.data;
};

export const declareMeetingOrReviewOrHost = (
  data: DeclareDataType,
  modalProps: DeclareModalPropsType,
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    url: '/complaints',
    data: {
      complaintId: modalProps.id,
      complaintType:
        modalProps.type === 'meeting'
          ? 'MEETING'
          : modalProps.type === 'review'
            ? 'REVIEW'
            : 'USER',
      ...data,
    },
  });
};
