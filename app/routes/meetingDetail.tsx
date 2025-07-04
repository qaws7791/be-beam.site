import { Suspense } from 'react';
import { useParams } from 'react-router';
import useMeetingQuery from '@/hooks/api/useMeetingQuery';

import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import Slider from '@/components/organisms/Slider';
import MeetingDetailCard from '@/components/organisms/MeetingDetailCard';
import MeetingDetailContent from '@/components/sections/MeetingDetailContent';
import MeetingDetailMeetingReviewsContainer from '@/components/sections/MeetingDetailMeetingReviewsContainer';

export function meta() {
  return [
    { title: '모임 상세페이지' },
    { name: 'description', content: '모임 상세정보를 확인하세요.' },
  ];
}

// api 들어오면 loader를 사용하여 서버에서 데이터 프리패치
// 그때는 useSuspenseQuery와 함께 Suspense 사용 가능
export async function loader() {
  return { data: [] };
}

export default function MeetingDetail() {
  // const { data } = loaderData;
  const id = Number(useParams().meetingId);
  const { data: meeting } = useMeetingQuery(id);

  return (
    <CommonTemplate>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex items-start gap-8">
          <div className="w-full max-w-[970px]">
            <Slider
              images={meeting?.meetingImages}
              isCount={true}
              slideWidth="w-full"
              slideHeight="h-[657px]"
              delay={5000}
            />
            <MeetingDetailContent meeting={meeting} />
            <MeetingDetailMeetingReviewsContainer meetingId={id} />
          </div>

          <div className="sticky top-[100px] h-fit flex-1">
            <MeetingDetailCard meeting={meeting} />
          </div>
        </div>
      </Suspense>
    </CommonTemplate>
  );
}
