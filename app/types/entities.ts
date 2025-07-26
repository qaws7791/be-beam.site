export type MeetingRecruitmentType = '정기모임' | '소모임';
export type MeetingRecruitmentStatus =
  | '모집예정'
  | '모집중'
  | '모집종료'
  | '모임중'
  | '모임완료';

export type ImageType = string;

export type LinkType = string;

export interface Guidebook {
  id: number;
  guidebookType: string;
  title: string;
  description: string;
  image: ImageType[];
  hashtags: string[];
  level: string;
  targetType: string;
  time: string;
  benefits: string[];
  file: string;
  recommendations: GuidebookRecommendation[];
}

export interface GuidebookRecommendation {
  id: number;
  title: string;
  image: ImageType;
}

export interface Topic {
  id: number;
  topic: string;
}

export interface MeetingSchedule {
  meetingStartTime: string;
  meetingEndTime: string;
  address: string;
  addressDetail: string;
  content: string;
}

export interface Meeting {
  id: number;
  recruitmentStatus: MeetingRecruitmentStatus;
  recruitmentType: MeetingRecruitmentType;
  guidebookReferenceId: number | null;
  guidebookReferenceTitle: string | null;
  selectionType: string;
  name: string;
  topic: string;
  participantCount: number;
  minParticipants: number;
  maxParticipants: number;
  recruitingStartTime: string;
  recruitingEndTime: string;
  meetingMode: string;
  address: string;
  paymentAmount: number;
  introduction: string;
  schedules: MeetingSchedule[];
  hashtags: string[];
  meetingImages: ImageType[];
  info: string;
  hostId: number;
  hostName: string;
  hostImage: string;
  hostDescription: string;
  likesCount: number;
  /** 로그인한 사용자 정보 */
  liked: boolean;
  reviewable: boolean;
  userStatus: string;
}

export interface Host {
  hostName: string;
  hostImage: string;
  hostInstruction: string;
  followCount: number;
  openingMeetingCount: number;
  openingMeetings: {
    id: number;
    meetingName: string;
    meetingImage: string;
    topic: string;
  }[];
  /** 로그인한 사용자 정보 */
  followed: boolean;
}

export interface UserInformation {
  name: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  gender: '여성' | '남성';
  /** 약관 동의 여부 */
  terms: boolean;
  userTerms: boolean;
  marketingTerms: boolean;
}

export interface UserProfile {
  nickname: string;
  introduction: string;
  profileImage: string;
  role: '일반 참가자' | '정기모임 호스트' | '소모임 호스트' | '관리자';
}

export interface MeetingSummary {
  id?: number;
  name: string;
  recruitmentType: string;
  recruitmentStatus: string;
  image: ImageType;
  meetingStartTime: string;
  address: string;
  liked?: boolean;
}

export interface Review {
  reviewId: number;
  profileImg: string;
  nickname: string;
  rating: number;
  text: string;
  images: ImageType[];
  createdAt: string;
  likesCount: number;
  /** 로그인한 사용자 정보 */
  liked: boolean;
  myReview: boolean;
}

export interface Banner {
  bannerId: number;
  bannerImg: ImageType;
  bannerUrl: string;
}

export type NotificationType = 'MEETING' | 'REVIEW' | 'HOST';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  redirectUrl: string;
  isRead: boolean;
}

export interface Participant {
  id: number;
  name: string;
  image: ImageType;
  authority: string; // "관리자" | "참가자" TODO: 이거 어떻게 되는지 확인해야함
  status: string; // "참여중" | "요청중" TODO: 이거 어떻게 되는지 확인해야함
}

export interface MeetingAttendanceParticipant {
  id: number;
  name: string;
  image: ImageType;
  isChecked: boolean;
}

export interface MeetingAttendance {
  scheduleId: number;
  round: number; // 회차 번호
  checkedCount: number; // 총 출석자 수
  totalCount: number; // 총 참여자 수
  scheduleParticipants: MeetingAttendanceParticipant[]; // 참여자 출석 목록
}
