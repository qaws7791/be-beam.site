import { ImageFilterChip } from '@/components/molecules/ImageFilterChip';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import { RatingFilter } from '@/components/molecules/RatingFilter';
import WideReviewCard from '@/components/molecules/WideReviewCard';
import CommonTemplate from '@/components/templates/CommonTemplate';
import useReviewsQuery from '@/hooks/api/useReviewsQuery';
import useReviewsParams from '@/hooks/business/useReviewsParams';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';

export function meta() {
  return [
    { title: '리뷰 페이지' },
    {
      name: 'description',
      content: '여러 사람들이 작성한 모임 후기를 확인하세요!',
    },
  ];
}

export default function Reviews() {
  const {
    params,
    handleUpdateRecruitmentType,
    handleUpdateSort,
    handleUpdateOnlyImage,
    handleUpdateRating,
  } = useReviewsParams();

  const { data: reviews } = useReviewsQuery(params);

  return (
    <CommonTemplate>
      <img
        src="https://placehold.co/1480x524"
        alt="후기들이 증명해주는 비빔의 모임"
        className="rounded-[27px]"
        width={1480}
        height={524}
      />
      <div className="mt-16 w-full">
        <Tabs
          defaultValue="all"
          className="w-full"
          value={params.recruitmentType}
          onValueChange={handleUpdateRecruitmentType}
        >
          <TabsList className="w-full">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="regular">정기모임</TabsTrigger>
            <TabsTrigger value="small">소모임</TabsTrigger>
          </TabsList>
          <div className="mt-4.5 flex w-full items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <ImageFilterChip
                isActive={params.onlyImage}
                onToggle={handleUpdateOnlyImage}
              />
              <RatingFilter
                rating={params.rating}
                onRatingChange={handleUpdateRating}
              />
            </div>
            <div>
              <RadioGroup
                defaultValue="latest"
                className="flex rounded-lg bg-gray-200 p-2"
                value={params.sort}
                onValueChange={handleUpdateSort}
              >
                <RadioGroupItem
                  value="latest"
                  id="sort-latest"
                  className="rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
                >
                  최신순
                </RadioGroupItem>

                <RadioGroupItem
                  value="like"
                  id="sort-like"
                  className="rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
                >
                  좋아요순
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>
          {['all', 'regular', 'small'].map((tab) => (
            <TabsContent
              key={tab}
              value={tab}
              className="mt-4.5 flex flex-col gap-8"
            >
              {reviews?.map((review) => (
                <WideReviewCard key={review.id} review={review} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CommonTemplate>
  );
}
