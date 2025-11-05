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
import Banner from '@/shared/components/common/Banner';

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
    <CommonTemplate className="pt-23 pb-10 lg:pt-41 lg:pb-16">
      <Banner
        imageUrl="/images/meeting_review_banner.png"
        height="h-[365px]"
        className="hidden lg:block"
      />
      <Banner
        imageUrl="/images/m_meeting_review_banner.png"
        height="h-[220px]"
        className="lg:hidden"
      />

      <div className="mt-6 w-full md:mt-10 lg:mt-16">
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
