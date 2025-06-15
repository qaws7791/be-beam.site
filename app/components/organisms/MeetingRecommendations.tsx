import Text from '../atoms/text/Text';

export default function MeetingRecommendations({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`${className} w-full text-left`}>
      <Text variant="H2_Semibold">{title}</Text>

      {/* 나중에 Tab으로 제작 */}
      <div className="mt-6 mb-5 flex items-center gap-3">
        <button className="rounded-full bg-[var(--color-gray-900)] px-4 py-2">
          <Text variant="B1_Semibold" color="white">
            전체
          </Text>
        </button>
        <button className="rounded-full bg-[var(--color-gray-200)] px-4 py-2">
          <Text variant="B1_Semibold">정기모임</Text>
        </button>
        <button className="rounded-full bg-[var(--color-gray-200)] px-4 py-2">
          <Text variant="B1_Semibold">소모임</Text>
        </button>
      </div>

      {/* Tab 안에 미팅 카드 */}
    </div>
  );
}
