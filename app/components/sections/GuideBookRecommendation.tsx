import { useNavigate } from 'react-router';
import type { RecommendationsGuideBookType } from '@/types/components';
import Text from '../atoms/text/Text';
import GuideBookRecommendationCard from '../molecules/GuideBookRecommendationCard';

export default function GuideBookRecommendation({
  recommendationData,
}: {
  recommendationData: RecommendationsGuideBookType[];
}) {
  const navigate = useNavigate();
  return (
    <div className="mt-4 w-full">
      <Text variant="T3_Semibold">
        <span className="text-primary">소통</span> 관련 추천 가이드북
      </Text>

      <div className="mt-5 w-full">
        {recommendationData?.map((data) => (
          <GuideBookRecommendationCard
            key={data.id}
            recommendationData={data}
            onClick={() => navigate(`/guideBook/${data.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
