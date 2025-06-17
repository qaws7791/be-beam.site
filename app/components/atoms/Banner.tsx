import clsx from 'clsx';

interface MeetingBannerProps {
  imageUrl: string;
  height: string;
}

export default function Banner({ imageUrl, height }: MeetingBannerProps) {
  return (
    <div
      className={clsx(
        `${height} relative w-full overflow-hidden rounded-2xl bg-cover bg-bottom bg-no-repeat`,
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
}
