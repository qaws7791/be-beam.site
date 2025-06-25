import type { FilterOption } from '@/routes/guideBooks';
import type { GuideBookType } from '@/types/components';
import { TabsContent } from '@radix-ui/react-tabs';

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
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-10 w-full bg-pink-400"
        >
          ssss
          {datas?.map((data) => <div key={data.id}>{data.title}</div>)}
        </TabsContent>
      ))}
    </>
  );
}
