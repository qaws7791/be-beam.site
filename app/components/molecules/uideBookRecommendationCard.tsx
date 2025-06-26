import type { RecommendationsGuideBookType } from '@/types/components';
import Text from '../atoms/text/Text';

export default function GuideBookRecommendationCard({
  recommendationData,
  onClick,
}: {
  recommendationData: RecommendationsGuideBookType;
  onClick: () => void;
}) {
  return (
    <div
      key={recommendationData.id}
      onClick={onClick}
      className="mb-3 box-border flex w-full cursor-pointer items-center gap-5 rounded-lg border-1 border-gray-300 p-6 transition-all duration-700 hover:bg-gray-100"
    >
      <img
        className="h-20 w-20 border-1 border-gray-300 object-cover"
        src={recommendationData.image}
        alt="guideBook_thumbnail"
      />

      <div className="flex-1">
        <Text variant="B1_Semibold" className="mb-2">
          {recommendationData.title}
        </Text>
        <Text variant="C2_Regular" color="gray-600">
          {recommendationData.description}
        </Text>
      </div>
    </div>
  );
}
