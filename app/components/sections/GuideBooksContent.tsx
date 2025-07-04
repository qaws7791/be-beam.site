import type { FilterOption, GuideBookType } from '@/types/components';

import { TabsContent } from '../atoms/tabs/Tabs';
import GridGroup from '../organisms/gridGroup/GridGroup';
import GuideBookCard from '../organisms/GuideBookCard';

export default function GuideBooksContent({
  list,
  datas,
}: {
  list: FilterOption[];
  datas: GuideBookType[];
}) {
  return (
    <>
      {list.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-10 w-full">
          <GridGroup columns={3} gap={8}>
            {datas?.map((data) => <GuideBookCard key={data.id} data={data} />)}
          </GridGroup>
        </TabsContent>
      ))}
    </>
  );
}
