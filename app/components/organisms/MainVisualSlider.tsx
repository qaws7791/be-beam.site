import useHomeBannerQuery from '@/hooks/api/useHomeBannerQuery';

import Slider from './Slider';
import LoadingSpinner from '../molecules/LoadingSpinner';

export default function MainVisualSlider() {
  const { data: banners, isLoading } = useHomeBannerQuery();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Slider
          datas={banners?.banners}
          isBtn={false}
          slideWidth="max-w-[1480px]"
          slideHeight="h-[400px]"
        />
      )}
    </>
  );
}
