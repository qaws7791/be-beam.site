import { useState } from 'react';
import { useNavigate } from 'react-router';

import { cn } from '@/styles/tailwind';
import type { GuidebookSummary } from '@/shared/types/entities';
import Text from '@/shared/components/ui/Text';

export default function GuideBookCard({ data }: { data: GuidebookSummary }) {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl border border-gray-300"
      key={data.id}
      onClick={() => navigate(`/guideBook/${data.id}`)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <img
        className="absolute top-0 left-0 aspect-square w-full object-cover"
        src={data.thumbnailImage}
        alt="guidBook_thumbnail"
      />

      <div
        className={cn(
          isActive ? 'translate-x-0' : 'sm:-translate-x-full',
          'absolute top-0 left-0 box-border flex aspect-square w-full flex-col justify-center bg-[rgba(0,0,0,0.5)] p-5 transition-all duration-700 sm:bg-[rgba(0,0,0,0.7)]',
        )}
      >
        <Text variant="T2_Semibold" color="white">
          {data.title}
        </Text>
        <Text variant="T4_Regular" color="gray-400" className="mt-5">
          {data.description}
        </Text>
      </div>
    </div>
  );
}

