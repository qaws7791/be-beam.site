import useMyNotificationsQuery from '@/hooks/api/useMyNotificationsQuery';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../atoms/popover/Popover';
import CloseIcon from '../atoms/icons/CloseIcon';

export default function NavbarUserSection({
  profileImage,
  onClick,
}: {
  profileImage: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <button className="cursor-pointer">
        <img src="/images/icons/like.svg" alt="like_icon" />
      </button>
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <img src="/images/icons/bell.svg" alt="bell_icon" />
        </PopoverTrigger>
        <PopoverContent className="z-[100] w-[400px] rounded-xl">
          <NotificationPopover />
        </PopoverContent>
      </Popover>
      <button onClick={onClick}>
        <img
          className="h-7 w-7 cursor-pointer rounded-full object-cover"
          src={profileImage}
          alt="profileImg"
        />
      </button>
    </div>
  );
}

function NotificationPopover() {
  const myNotifications = useMyNotificationsQuery();
  return (
    <div>
      <div>
        <p className="text-t3 text-gray-800">알림</p>
      </div>
      <ul className="mt-5 flex max-h-[400px] flex-col gap-3 overflow-y-auto">
        {myNotifications.data?.alarms.map((alarm) => (
          <li
            key={alarm.id}
            className="flex items-start justify-between rounded-lg border border-gray-300 px-5 py-4"
          >
            <div className="flex h-full flex-col justify-between">
              <p className="line-clamp-2 h-10 text-b2 text-gray-800">
                {alarm.message}
              </p>
              <time className="text-c3 text-gray-500">{alarm.timestamp}</time>
            </div>
            <button aria-label="알림 삭제" type="button">
              <CloseIcon className="size-6 text-gray-700" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
