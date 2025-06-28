import HeartFillIcon from '@/components/atoms/icons/HeartFillIcon';
import useMyHostLikesQuery from '@/hooks/api/useMyHostLikesQuery';

export default function HostLikes() {
  const hostLikes = useMyHostLikesQuery({
    page: 1,
    size: 10,
  });
  return (
    <div className="mt-8 grid flex-1 grid-cols-3 gap-x-5 gap-y-8">
      {hostLikes.data?.hosts.map((host) => (
        <div key={host.id} className="flex flex-col gap-3">
          <div className="relative">
            <img
              src={host.profileImage}
              alt={host.nickname}
              className="w-full rounded-3xl object-cover"
            />
            <button className="absolute top-5 right-5">
              <HeartFillIcon className="size-8 text-error" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-t2">{host.nickname}</p>
            <p className="text-b3 text-gray-600">{host.introduction}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
