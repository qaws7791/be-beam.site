import useHomeBannerQuery from '@/hooks/api/useHomeBannerQuery';

import Slider from './Slider';

export default function MainVisualSlider() {
  const { data: banners } = useHomeBannerQuery();

  return (
    <Slider
      datas={banners?.banners}
      isBtn={false}
      slideWidth="max-w-[1480px]"
      slideHeight="h-[400px]"
    />
  );
}
