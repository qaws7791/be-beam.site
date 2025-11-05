import type { Banner } from '@/shared/types/entities';
import Slider from '../../../shared/components/common/Slider';

export default function MainVisualSlider({ banners }: { banners: Banner[] }) {
  return (
    <Slider
      datas={banners}
      isBtn="hidden"
      slideWidth="max-w-[1448px]"
      slideHeight="h-[220px] lg:h-[365px]"
      classNames="lg:px-0 px-4 box-border"
    />
  );
}
