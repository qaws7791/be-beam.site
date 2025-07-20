// smart 패턴 컴포넌트. 기능 중심

import { useEffect, useMemo, useState } from 'react';
import useMeetingReviewsQuery from '@/hooks/api/useMeetingReviewsQuery';

import Text from '../atoms/text/Text';
import MeetingReviewCard from '../organisms/MeetingReviewCard';
import { Button } from '../atoms/button/Button';

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

  const [btnIsVisible, setBtnIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isScrolledBeyond1200 = currentScrollY > 1200;
      const isNearBottom500 =
        currentScrollY + viewportHeight >= documentHeight - 200;

      if (isScrolledBeyond1200 && !isNearBottom500) {
        setBtnIsVisible(true);
      } else {
        setBtnIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full pt-12">
      <Text variant="T3_Semibold" className="mb-4">
        모임 후기
        <span className="ml-1 text-gray-500">{meetingReviewList.length}</span>
      </Text>

      <div className="box-border w-full">
        {meetingReviewList?.map((review) => (
          <MeetingReviewCard
            key={review.reviewId}
            review={review}
            meetingReviewList={meetingReviewList}
          />
        ))}
        <Button
          variant="tertiary"
          size="sm"
          className={`${btnIsVisible && hasNextPage ? 'block' : 'hidden'} fixed bottom-5 left-[25%] z-50 w-75 border-gray-500 text-gray-600`}
          onClick={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          후기 더 보기
        </Button>
      </div>
    </div>
  );
};

export default MeetingDetailMeetingReviewsContainer;
