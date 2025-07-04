import * as React from 'react';

import { cn } from '@/lib/tailwind';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(
    props.defaultValue || '',
  );
  const isControlled = props.value !== undefined;

  const displayValue = isControlled ? props.value : internalValue;
  const innerRef = React.useRef<HTMLTextAreaElement>(null);

  const setRefs = (node: HTMLTextAreaElement) => {
    innerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const valueCount =
    typeof displayValue === 'string'
      ? displayValue.length
      : typeof displayValue === 'number'
        ? displayValue.toString().length
        : 0;
  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        ref={setRefs}
        className={cn(
          'flex field-sizing-content min-h-16 w-full resize-none rounded-lg border border-gray-400 bg-transparent px-3 py-2 text-t4 text-black shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-error/20 md:text-sm',
          className,
        )}
        value={displayValue}
        onChange={(e) => {
          if (isControlled) {
            props.onChange?.(e);
          } else {
            setInternalValue(e.target.value);
          }
        }}
        {...props}
      />
      {props.maxLength && (
        <div className="absolute right-4 bottom-[13px] mt-1 text-xs text-gray-700">
          <span className="text-primary">{valueCount}</span>/{props.maxLength}
        </div>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
