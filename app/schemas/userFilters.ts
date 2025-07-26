import { z } from 'zod';
// 마이페이지 관련

// 내가 개설한 모임 Detail 탭
export const MyCreatedMeetingDetailFilterSchema = z.object({
  type: z.enum(['meeting', 'schedule']).default('meeting'),
});

export type MyCreatedMeetingDetailFilters = z.infer<
  typeof MyCreatedMeetingDetailFilterSchema
>;

// 내가 개설한 모임 관리 탭
export const MyCreatedMeetingManageFilterSchema = z.object({
  type: z
    .enum(['applicants', 'participants', 'attendance'])
    .default('applicants'),
});

export type MyCreatedMeetingManageFilters = z.infer<
  typeof MyCreatedMeetingManageFilterSchema
>;

// 나의 모임 - 참여 모임
export const MyParticipatedMeetingFilterSchema = z.object({
  status: z
    .enum(['participating', 'completed', 'cancelled'])
    .default('participating'),
  page: z.coerce.number().default(1),
});

export type MyParticipatedMeetingFilters = z.infer<
  typeof MyParticipatedMeetingFilterSchema
>;
