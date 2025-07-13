import HostCard from '@/components/molecules/HostCard';
import useMyHostLikesQuery from '@/hooks/api/useMyHostLikesQuery';

export default function HostLikes() {
  const hostLikes = useMyHostLikesQuery({
    page: 1,
    size: 10,
  });
  return (
    <div className="mt-8 grid flex-1 grid-cols-3 gap-x-5 gap-y-8">
      {hostLikes.data?.hosts.map((host) => (
        <HostCard key={host.id} host={host} />
      ))}
    </div>
  );
}
