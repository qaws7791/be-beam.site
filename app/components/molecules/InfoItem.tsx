import clsx from 'clsx';

interface InfoItemProps {
  icon: string;
  iconAlt: string;
  text: string;
  wrapStyle?: string;
  iconStyle?: string;
  textStyle?: string;
}

const InfoItem = ({
  icon,
  iconAlt,
  text,
  wrapStyle,
  iconStyle = 'w-6 h-6',
  textStyle = 'text-b3 text-gray-600',
}: InfoItemProps) => (
  <div className={clsx('flex items-center', wrapStyle)}>
    <img className={iconStyle} src={icon} alt={iconAlt} />
    <p className={textStyle}>{text}</p>
  </div>
);

export default InfoItem;
