import { useParams } from 'react-router';
import useCreatedMeetingDetailQuery from '@/hooks/api/useCreatedMeetingDetailQuery';
import useCreatedMeetingDetailDetailParams from '@/hooks/business/useCreatedMeetingDetailDetailParams';
import { metaTemplates } from '@/config/meta-templates';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import CreatedMeetingDetailMeetingDetailContent from '@/components/organisms/CreatedMeetingDetailMeetingDetailContent';
import CreatedScheduleDetailMeetingDetailContent from '@/components/organisms/CreatedScheduleDetailMeetingDetailContent';

export function meta() {
  return metaTemplates.createdMeetingDetailDetail();
}

export default function CreatedMeetingDetailDetail() {
  const id = Number(useParams()?.meetingId);
  const { data: createdMeetingDetail } = useCreatedMeetingDetailQuery(id);
  const { params, handleUpdateType } = useCreatedMeetingDetailDetailParams();

  const typeList = [
    { text: '🥳모임 상세', value: 'meeting' },
    { text: '📆일정 상세', value: 'schedule' },
  ];

  return (
    <div className="w-full py-6">
      <Tabs
        defaultValue="meeting"
        className="text-b1"
        value={params.type}
        onValueChange={handleUpdateType}
      >
        <TabsList className="h-auto gap-4 before:h-0">
          {typeList.map((type, idx) => (
            <TabsTrigger
              key={idx}
              className="h-auto cursor-pointer rounded-full bg-gray-200 px-4 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
              value={type.value}
            >
              {type.text}
            </TabsTrigger>
          ))}
        </TabsList>

        {typeList.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            {tab.value === 'meeting' ? (
              <CreatedMeetingDetailMeetingDetailContent
                createdMeetingDetail={createdMeetingDetail}
              />
            ) : (
              <CreatedScheduleDetailMeetingDetailContent
                createdMeetingDetail={createdMeetingDetail}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
