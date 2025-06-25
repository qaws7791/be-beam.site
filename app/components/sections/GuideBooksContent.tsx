import { useNavigate } from 'react-router';
import type { FilterOption } from '@/routes/guideBooks';
import type { GuideBookType } from '@/types/components';

import { TabsContent } from '../atoms/tabs/Tabs';
import GridGroup from '../organisms/gridGroup/GridGroup';
import Text from '../atoms/text/Text';

export default function GuideBooksContent({
  list,
  datas,
}: {
  list: FilterOption[];
  datas: GuideBookType[];
}) {
  const navigate = useNavigate();

  return (
    <>
      {list.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-10 w-full">
          <GridGroup columns={3} gap={8}>
            {datas?.map((data) => (
              <div
                className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
                key={data.id}
                onClick={() => navigate(`/guideBook/${data.id}`)}
              >
                <img
                  className="h-[240px] w-full object-cover"
                  src={data.image}
                  alt="guidBook_thumbnail"
                />
                <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
                  <Text variant="T2_Semibold" className="truncate">
                    {data.title}
                  </Text>
                  <Text
                    variant="T4_Regular"
                    color="gray-700"
                    className="mt-3 truncate"
                  >
                    {data.description}
                  </Text>
                </div>
              </div>
            ))}
          </GridGroup>
        </TabsContent>
      ))}
    </>
  );
}
