import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from './Slider';

export default function MainVisualSlider() {
  const { data } = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `/api/web/v1/home?likes=all&random=all&recent=all`,
      });
      const data = res.data;
      return data.result;
    },
  });

  return (
    <Slider
      datas={data?.banners}
      isBtn={false}
      slideWidth="max-w-[1480px]"
      slideHeight="h-[400px]"
    />
  );
}
