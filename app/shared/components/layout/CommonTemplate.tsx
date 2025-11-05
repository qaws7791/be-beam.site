import { cn } from '@/styles/tailwind';
import type React from 'react';

export default function CommonTemplate({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-full max-w-[1480px] px-4 pt-41 pb-16',
        className,
      )}
    >
      {children}
    </div>
  );
}
