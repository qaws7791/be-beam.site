import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';
import type {
  MyAppliedMeetingFilters,
  MyParticipatedMeetingFilters,
} from '@/features/mypage/schemas/userFilters';
import type { RecommendationMeetingsParams } from '@/shared/api/endpoints/home';
import type { OpeningMeetingListParams } from '@/shared/api/endpoints/mypage';
import type { MyMeetingLikesParams } from '@/shared/api/endpoints/users';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const meetingQueryKeys = createQueryKeys('meetings', {
  list: (filters: MeetingListFilters) => [filters],
  detail: (id: number) => [id],
  appliedMeetings: (filters: MyAppliedMeetingFilters) => [filters],
  meetingApplicants: (id: number) => [id],
  meetingAttendance: (id: number) => [id],
  createdMeetings: (params: OpeningMeetingListParams) => [params],
  createdMeetingDetail: (id: number) => [id],
  createdMeetingIntro: (id: number) => [id],
  createdMeetingParticipants: (id: number) => [id],
  createdMeetingSchedule: (id: number) => [id],
  recommendedMeetings: (
    type: RecommendationMeetingsParams['topic'],
    tab: RecommendationMeetingsParams['type'],
  ) => [{ type, tab }],
  likedMeetings: (params: MyMeetingLikesParams) => [params],
  participatedMeetings: (params: MyParticipatedMeetingFilters) => [params],
});

export const topicsQueryKeys = createQueryKeys('topics', {
  all: null,
});
