import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';

interface ReportComplaintData {
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

export const reportComplaint = async (data: ReportComplaintData) => {
  return;
  const res = await axiosInstance.post<APIResponse<string>>(
    '/complaints',
    data,
    {
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data;
};
