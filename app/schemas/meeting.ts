import { z } from 'zod';

export const applyMeetingSchema = z.object({
  joinReason: z.string().min(10).max(500),
});

export const cancelMeetingReasonSchema = z.object({
  reasonType: z.enum(
    ['personalSchedule', 'changeMind', 'locationNonconformity', 'etc'],
    {
      required_error: '취소 사유를 선택해주세요.',
    },
  ),
  description: z
    .string()
    .min(10, '사유는 최소 10자 이상 작성해야 합니다.')
    .max(100, '사유는 최대 100자까지 작성할 수 있습니다.'),
});

export const declareReasonSchema = z.object({
  reasonType: z.enum(
    [
      'ADVERTISEMENT',
      'SEXUAL',
      'PERSONAL_ATTACKS',
      'COMMERCIAL',
      'SPAM',
      'SPYWARE',
      'PRIVACY_VIOLATION',
      'OTHER',
    ],
    {
      required_error: '신고 사유를 선택해주세요.',
    },
  ),
  description: z
    .string()
    .min(10, '사유는 최소 10자 이상 작성해야 합니다.')
    .max(100, '사유는 최대 100자까지 작성할 수 있습니다.'),
});
