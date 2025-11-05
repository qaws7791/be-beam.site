import { type SVGProps } from 'react';

interface SirenIconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

const SirenIcon = ({ strokeWidth = 1.5, ...props }: SirenIconProps) => (
  <svg
    width={props.width || '32'}
    height={props.height || '32'}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.33301 16.0002C9.33301 14.2321 10.0354 12.5364 11.2856 11.2861C12.5359 10.0359 14.2316 9.3335 15.9997 9.3335C17.7678 9.3335 19.4635 10.0359 20.7137 11.2861C21.964 12.5364 22.6663 14.2321 22.6663 16.0002V24.0002H9.33301V16.0002Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66699 26.6667C6.66699 25.9594 6.94794 25.2811 7.44804 24.781C7.94814 24.281 8.62641 24 9.33366 24H22.667C23.3742 24 24.0525 24.281 24.5526 24.781C25.0527 25.2811 25.3337 25.9594 25.3337 26.6667V29.3333H6.66699V26.6667Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 16H29.3333"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.6667 6L24 6.66667"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66699 16H4.00033"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2.6665V3.99984"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.57227 6.57178L7.51493 7.51444"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16V24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SirenIcon;
