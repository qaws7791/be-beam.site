import { Suspense } from 'react';
import { useParams } from 'react-router';
import useMeetingQuery from '@/hooks/api/useMeetingQuery';
import { useModalStore } from '@/stores/useModalStore';

import { cn } from '@/lib/tailwind';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import Slider from '@/components/organisms/Slider';
import MeetingDetailCard from '@/components/organisms/MeetingDetailCard';
import MeetingDetailContent from '@/components/sections/MeetingDetailContent';
import MeetingDetailMeetingReviewsContainer from '@/components/sections/MeetingDetailMeetingReviewsContainer';
import Text from '@/components/atoms/text/Text';
import { Button } from '@/components/atoms/button/Button';
import type { Route } from './+types/meetingDetail';
import { withOptionalAuth } from '@/lib/auth.server';
import { getMeetingDetail } from '@/api/meetings';

export function meta() {
  return [
    { title: '모임 상세페이지' },
    { name: 'description', content: '모임 상세정보를 확인하세요.' },
  ];
}

// api 들어오면 loader를 사용하여 서버에서 데이터 프리패치
// 그때는 useSuspenseQuery와 함께 Suspense 사용 가능
export async function loader({ request, params }: Route.LoaderArgs) {
  return withOptionalAuth(request, async ({ user }) => {
    const cookiesHeaderFromBrowser = request.headers.get('Cookie');

    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    const meetingDetail = await getMeetingDetail(Number(params.meetingId), {
      headers: axiosRequestConfigHeaders,
    });
    console.log(meetingDetail);

    return {
      meetingDetail: meetingDetail,
      user: user,
    };
  });
}

export default function MeetingDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().meetingId);

  const { data } = loaderData;
  const user = data?.user;
  const initialMeetingDetail = data?.meetingDetail;
  console.log(initialMeetingDetail, user);

  const { data: meeting } = useMeetingQuery(id);
  // const meetingDetail = clientMeetingDetail || initialMeetingDetail || {};

  const { open } = useModalStore();

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
            <div
              className={cn(
                'mt-5 box-border flex w-full flex-col items-center rounded-xl border-1 border-gray-300 p-12',
                meeting?.reviewable ? 'block' : 'hidden',
              )}
            >
              <Text color="gray-600" className="mb-6">
                참여한 모임은 어떠셨나요?
                <br />
                소중한 경험을 함께 나눠요🥰
              </Text>
              <Button
                size="sm"
                className="w-82"
                onClick={() =>
                  open('EDIT_MEETING_REVIEW_MODAL', {
                    meeting,
                  })
                }
              >
                ✍️ 후기 작성하기
              </Button>
            </div>
          </div>
        </div>
      </Suspense>
    </CommonTemplate>
  );
}
