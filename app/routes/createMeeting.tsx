import { metaTemplates } from '@/config/meta-templates';

import CreateMeetingTemplate from '@/components/templates/CreateMeetingTemplate';

export function meta() {
  return metaTemplates.createMeeting();
}

export default function CreatedMeeting() {
  return <CreateMeetingTemplate>모임 생성 페이지</CreateMeetingTemplate>;
}
