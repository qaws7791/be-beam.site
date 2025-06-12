import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { baseStyles, sizeStyles, variantStyles } from './Button.styles';
import type { ButtonProps } from '@/types/components';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          disabled
            ? 'cursor-not-allowed bg-[#E9E9E9] text-[#9D9D9D]'
            : variantStyles[variant],
          className,
          sizeStyles[size],
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
// React DevTools에서 컴포넌트 이름을 명시적으로 표시해주기 위해 사용

export default Button;
