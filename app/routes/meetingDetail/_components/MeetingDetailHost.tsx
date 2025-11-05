// dumb 패턴 컴포넌트. UI 관련 로직만

import Text from '../../../shared/components/ui/Text';
import ChevronRightIcon from '@/shared/components/icons/ChevronRightIcon';

interface MeetingDetailHostProps {
  hostImg: string;
  hostName: string;
  hostDes: string;
  onClick: () => void;
}

export default function MeetingDetailHost({
  hostImg,
  hostName,
  hostDes,
  onClick,
}: MeetingDetailHostProps) {
  return (
    <div
      onClick={onClick}
      className="mt-5 box-border flex w-full items-center gap-10 bg-white px-10 py-7 lg:rounded-xl lg:bg-gray-200"
    >
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={hostImg}
        alt="host_img"
      />

      <div className="w-full flex-1">
        <div className="mb-3 flex items-center gap-x-1">
          <img src="/images/icons/host.svg" alt="host_icon" />
          <Text variant="B2_Medium" className="mr-1 cursor-pointer">
            {hostName}
          </Text>
          <ChevronRightIcon width="6" height="12" />
        </div>

        <Text variant="B2_Medium" color="gray-600">
          {hostDes}
        </Text>
      </div>
    </div>
  );
}
