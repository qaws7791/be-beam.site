import axios from 'axios';

export const getHomeBanners = async () => {
  const res = await axios({
    method: 'GET',
    url: `/api/web/v2/home/banners`,
  });
  const data = res.data;
  return data.result;
};

export const getRecommendationMeetings = async (
  apiEndpoints: Record<string, string>,
  type: string,
  tab: string,
) => {
  const res = await axios({
    method: 'GET',
    url: `${apiEndpoints[type]}?type=${tab}`,
  });
  const data = res.data;
  return data.result;
};
