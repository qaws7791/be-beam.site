import WideReviewCard from '@/routes/reviews/_components/WideReviewCard';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import useReviewsQuery from '@/features/reviews/hooks/useReviewsQuery';
import useReviewsParams from '@/features/reviews/hooks/useReviewsParams';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { metaTemplates } from '@/shared/config/meta-templates';
import { TabNav, TabNavLink } from '@/shared/components/ui/TabNav';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ReviewFilters from '@/routes/reviews/_components/ReviewFilters';

export function meta() {
  return metaTemplates.reviews();
}

const REVIEW_TABS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'regular',
    label: '정기모임',
  },
  {
    value: 'small',
    label: '소모임',
  },
];

export default function Reviews() {
  const { params, handleUpdateSort, handleUpdateType, handleUpdateRating } =
    useReviewsParams();

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewsQuery({
      ...params,
      size: 20,
    });

  const allReviews = data?.pages.flatMap((page) => page.reviews);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <CommonTemplate>
      <img
        src="/images/meeting_review_banner.png"
        alt="후기들이 증명해주는 비빔의 모임"
        className="rounded-[27px]"
        width={1480}
        height={524}
      />
      <div className="mt-16 w-full">
        <TabNav>
          {REVIEW_TABS.map((tab) => (
            <TabNavLink
              key={tab.value}
              to={{
                search: `?recruitmentType=${tab.value}`,
              }}
              isActive={params.recruitmentType === tab.value}
            >
              {tab.label}
            </TabNavLink>
          ))}
        </TabNav>
        <ReviewFilters
          type={params.type}
          rating={params.rating}
          sort={params.sort}
          onTypeChange={handleUpdateType}
          onRatingChange={handleUpdateRating}
          onSortChange={handleUpdateSort}
        />
        <div className="mt-4.5 flex flex-col gap-8">
          {allReviews?.map((review) => (
            <WideReviewCard key={review.reviewId} review={review} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </div>
      </div>
    </CommonTemplate>
  );
}
