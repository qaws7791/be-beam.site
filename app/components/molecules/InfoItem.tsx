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
  iconStyle,
  textStyle,
}: InfoItemProps) => (
  <div className={clsx('flex items-center', wrapStyle)}>
    <img className={clsx(iconStyle, 'h-6 w-6')} src={icon} alt={iconAlt} />
    <p className={clsx(textStyle, 'text-b3 text-gray-600')}>{text}</p>
  </div>
);

export default InfoItem;
