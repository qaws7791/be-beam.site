import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { cn } from '@/styles/tailwind';
import type { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { Banner } from '@/shared/types/entities';
import Text from '../ui/Text';
import { IconButton } from '@/shared/components/ui/IconButton';

export default function Slider({
  ref,
  images,
  slidesPreView = 1,
  spaceBetween = 20,
  isLoop = true,
  delay = 3000,
  isBtn = 'flex',
  isPagination = false,
  isCount = false,
  slideWidth,
  slideHeight,
  datas,
  classNames,
  imageStyle,
}: {
  ref?: React.Ref<HTMLDivElement>;
  images?: string[];
  slidesPreView?: number;
  spaceBetween?: number;
  isLoop?: boolean;
  delay?: number;
  isBtn?: string;
  isPagination?: boolean;
  isCount?: boolean;
  slideWidth: string;
  slideHeight: string;
  datas?: Banner[];
  classNames?: string;
  imageStyle?: string;
}) {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden rounded-xl',
        slideWidth,
        classNames,
      )}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setCurrentIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={isPagination}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPreView}
        loop={isLoop}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
      >
        {images
          ? images?.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={cn(
                    'w-full rounded-xl object-cover',
                    slideHeight,
                    imageStyle,
                  )}
                />
              </SwiperSlide>
            ))
          : datas?.map((data, index) => (
              <SwiperSlide key={index}>
                <img
                  src={data.bannerImage}
                  alt={`Slide ${index + 1}`}
                  className={cn(
                    'w-full cursor-pointer rounded-xl object-cover',
                    slideHeight,
                  )}
                  onClick={() => navigate(data.bannerUrl)}
                />
              </SwiperSlide>
            ))}

        {isCount && (
          <Text
            variant="C2_Regular"
            className="absolute right-5 bottom-[10%] z-10 flex h-[26px] w-[50px] items-center justify-center rounded-3xl bg-white shadow-lg lg:top-5"
          >{`${currentIndex + 1} / ${images?.length}`}</Text>
        )}

        <IconButton
          variant="outline"
          className={cn(
            isBtn,
            'absolute top-1/2 left-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-md',
            images?.length === 1
              ? 'cursor-default bg-gray-300'
              : images?.length !== 1
                ? 'bg-white'
                : 'hidden',
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img src="/images/icons/prev.svg" alt="prev_icon" />
        </IconButton>

        <IconButton
          variant="outline"
          className={cn(
            isBtn,
            'absolute top-1/2 right-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none shadow-md',
            images?.length === 1
              ? 'cursor-default bg-gray-300'
              : images?.length !== 1
                ? 'bg-white'
                : 'hidden',
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img src="/images/icons/next.svg" alt="next_icon" />
        </IconButton>
      </Swiper>
    </div>
  );
}
