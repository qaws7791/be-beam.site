import type React from 'react';

export default function TitleAndDes({
  title,
  wrapStyle = 'flex items-center gap-2',
  titleStyle = 'text-t3 mb-4',
  children,
  ref,
}: {
  title: string;
  wrapStyle?: string;
  titleStyle?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className={wrapStyle} ref={ref}>
      <p className={titleStyle}>{title}</p>

      {children}
    </div>
  );
}
