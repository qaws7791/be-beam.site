// 페이지 && Smart 컴포넌트: 기능 중심(Suspense)

import { Suspense } from 'react';
import GetMeetingsContainer from '@/containers/GetMeetingsContainer';
import CommonTemplate from '@/components/templates/CommonTemplate';

export function meta() {
  return [
    { title: '모임 페이지' },
    { name: 'description', content: '모임을 생성하거나 모임에 참여하세요!' },
  ];
}

export default function Meetings() {
  return (
    <CommonTemplate>
      <Suspense fallback={<p>Loading...</p>}>
        <GetMeetingsContainer />
      </Suspense>
    </CommonTemplate>
  );
}
