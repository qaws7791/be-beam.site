import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';

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
