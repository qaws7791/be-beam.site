export type MeetingRecruitmentType = '정기모임' | '소모임';
export type MeetingRecruitmentStatus =
  | '모집예정'
  | '모집중'
  | '모집마감'
  | '모임중'
  | '모임완료';

export interface Guidebook {
  id: number;
  guidebookType: string;
  title: string;
  description: string;
  images: string[];
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
  thumbnailImage: string;
  description: string;
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
  guidebook: GuidebookRecommendation;
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
  meetingImages: string[];
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

export interface MeetingApplicants {
  applicantCount: number;
  applicants: Applicants[];
}

export interface Applicants {
  id: number;
  nickname: string;
  name: string;
  image: string;
  phoneNumber: string;
  joinReason: string;
  userStatus: string;
}

export interface MeetingParticipants {
  participantCount: number;
  participants: Participants[];
}

export interface Participants {
  id: number;
  authority: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  image: string;
  userStatus: string;
}

export interface MeetingAttendance {
  attendanceStatus: MeetingAttendanceSchedule[];
}

export interface MeetingAttendanceSchedule {
  scheduleId: number;
  round: number;
  checkedCount: number;
  totalCount: number;
  scheduleParticipants: AttendanceScheduleParticipants[];
}

export interface AttendanceScheduleParticipants {
  id: number;
  nickname: string;
  name: string;
  image: string;
  isChecked: '참석' | '불참' | '지각';
}

export interface EditMeetingSchedule {
  id: null | number;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  address: string;
  addressDetail: string;
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
  role: string;
}

export interface MeetingSummary {
  id?: number;
  name: string;
  recruitmentType: string;
  recruitmentStatus: string;
  image: string;
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
  images: string[];
  createdAt: string;
  likesCount: number;
  /** 로그인한 사용자 정보 */
  liked: boolean;
  myReview: boolean;
}

export interface Banner {
  bannerId: number;
  bannerImage: string;
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
