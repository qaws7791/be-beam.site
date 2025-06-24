// smart 패턴 컴포넌트. 기능 중심

import { useMemo, useState } from 'react';
import useMeetingReviewsQuery from '@/hooks/api/useMeetingReviewsQuery';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';

import Text from '../atoms/text/Text';
import MeetingDetailEditMeetingReview from '../organisms/MeetingDetailEditMeetingReview';
import MeetingReviewCard from '../organisms/MeetingReviewCard';

const MeetingDetailMeetingReviewsContainer = ({
  meetingId,
}: {
  meetingId: number;
}) => {
  // 동헌님과 겹치는 부분이 많아 일단 생략하겠습니다
  // 모임 후기 작성란 역시 디자인 수정 후에 추가하는게 나을 것 같습니다
  const [sort] = useState('all');
  const [type] = useState('text');
  const [rating] = useState<string | number>('all');

  const {
    data: meetingReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingReviewsQuery(meetingId, sort, type, rating);

  const meetingReviewList = useMemo(() => {
    return meetingReviews?.pages?.flatMap((page) => page.reviews) || [];
  }, [meetingReviews]);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="w-full pt-12">
      <Text variant="T3_Semibold" className="mb-4">
        모임 후기
        <span className="ml-1 text-gray-500">{meetingReviewList.length}</span>
      </Text>

      {/* 모임 후기 작성란 */}
      <MeetingDetailEditMeetingReview />

      <div className="box-border w-full">
        {meetingReviewList?.map((review) => (
          <MeetingReviewCard
            key={review.reviewId}
            review={review}
            meetingReviewList={meetingReviewList}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingDetailMeetingReviewsContainer;
