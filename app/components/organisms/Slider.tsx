import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';

import { Button } from '../atoms/button/Button';
import Text from '../atoms/text/Text';

export default function Slider({
  images,
  slidesPreView = 1,
  spaceBetween = 20,
  isLoop = true,
  delay = 3000,
  isPagination = false,
  isCount = false,
  slideWidth,
  slideHeight,
}: {
  images: string[];
  slidesPreView?: number;
  spaceBetween?: number;
  isLoop?: boolean;
  delay?: number;
  isPagination?: boolean;
  isCount?: boolean;
  slideWidth: string;
  slideHeight: string;
}) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className={clsx('relative w-full overflow-hidden rounded-xl', slideWidth)}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // ✅ Swiper 인스턴스를 ref에 저장
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
        {images?.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={clsx('h-[657px] w-full object-cover', slideHeight)}
            />
          </SwiperSlide>
        ))}

        {isCount && (
          <Text
            variant="C2_Regular"
            className="absolute top-5 right-5 z-10 flex h-[26px] w-[50px] items-center justify-center rounded-3xl bg-white shadow-lg"
          >{`${currentIndex + 1} / ${images?.length}`}</Text>
        )}

        <Button
          variant="tertiary"
          size="icon"
          className={clsx(
            'absolute top-1/2 left-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-md',
            images?.length === 1 ? 'cursor-default bg-gray-300' : 'bg-white',
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img src="/images/icons/prev.svg" alt="prev_icon" />
        </Button>

        <Button
          variant="tertiary"
          size="icon"
          className={clsx(
            'absolute top-1/2 right-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none shadow-md',
            images?.length === 1 ? 'cursor-default bg-gray-300' : 'bg-white',
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img src="/images/icons/next.svg" alt="next_icon" />
        </Button>
      </Swiper>
    </div>
  );
}
