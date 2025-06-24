import { Tag } from './tag/Tag';

interface MeetingTypeTagProps {
  type: 'regular' | 'small';
}

export default function MeetingTypeTag({ type }: MeetingTypeTagProps) {
  const isRegular = type === 'regular';
  return (
    <Tag variant={isRegular ? 'blue' : 'primary'}>
      {isRegular ? '정기모임' : '소모임'}
    </Tag>
  );
}
