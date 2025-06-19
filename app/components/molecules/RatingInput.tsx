import { cn } from '@/lib/tailwind';
import StarIcon from '../atoms/icons/StarIcon';
import StarOutlineIcon from '../atoms/icons/StarOutlineIcon';
import { useState } from 'react';

type RatingInputProps = {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  starClassName?: string;
  count?: number;
};

export default function RatingInput({
  value = 0,
  onChange,
  disabled = false,
  className,
  starClassName,
  count = 5,
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (newValue: number) => {
    if (!disabled && onChange) {
      onChange(newValue);
    }
  };

  const handleMouseEnter = (hoverValue: number) => {
    setHoverValue(hoverValue);
    if (!disabled) {
      // 여기에 hover 효과를 위한 로직을 추가할 수 있습니다.
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    if (!disabled) {
      // hover 효과를 초기화하는 로직을 추가할 수 있습니다.
    }
  };

  return (
    <div className={cn('flex', className)}>
      {Array.from({ length: count }, (_, index) => {
        const ratingValue = index + 1;
        const isHovered = hoverValue !== null && hoverValue >= ratingValue;

        const displayValue = isHovered ? hoverValue || 0 : value;
        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              'p-1 focus:outline-none',
              {
                'cursor-pointer': !disabled,
                'cursor-not-allowed': disabled,
              },
              starClassName,
            )}
            disabled={disabled}
            aria-label={`${ratingValue}점`}
          >
            {displayValue >= ratingValue ? (
              <StarIcon className="size-8 text-yellow-400" />
            ) : (
              <StarOutlineIcon className="size-8 text-gray-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}
