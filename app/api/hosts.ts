import axios from 'axios';

export const getHostDetail = async (id: number) => {
  const res = await axios({
    method: 'GET',
    url: `/api/web/v2/host/${id}`,
  });
  const data = res.data;
  return data.result;
};
