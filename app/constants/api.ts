export const API_V1_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/v1';
export const API_V2_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/v2';
export const ACCESS_TOKEN_COOKIE_NAME = 'access';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh';

export const REPORT_REASONS = [
  { value: 'ADVERTISEMENT', label: '불법 광고' },
  { value: 'SEXUAL', label: '음란성/선정성' },
  { value: 'PERSONAL_ATTACKS', label: '욕설/인신공격' },
  { value: 'COMMERCIAL', label: '영리목적' },
  { value: 'SPAM', label: '도배성 글/반복 댓글' },
  { value: 'SPYWARE', label: '악성 코드/스파이웨어' },
  { value: 'PRIVACY_VIOLATION', label: '개인정보 노출/사생활 침해' },
  { value: 'OTHER', label: '기타' },
] as const;

export type ReportReasonValue = (typeof REPORT_REASONS)[number]['value'];

export const REPORT_REASONS_VALUES = [
  'ADVERTISEMENT',
  'SEXUAL',
  'PERSONAL_ATTACKS',
  'COMMERCIAL',
  'SPAM',
  'SPYWARE',
  'PRIVACY_VIOLATION',
  'OTHER',
] as const;
