import type { TypographyVariant } from '../../../types/components';

export const variantStyles: Record<TypographyVariant, string> = {
  H0_Bold: 'text-[36px] font-bold leading-[140%]',
  H1_Bold: 'text-[26px] font-bold leading-[140%]',
  H2_Semibold: 'text-[24px] font-semibold leading-[120%]',
  T1_Regular: 'text-[20px] font-normal leading-[120%]',
  T2_Semibold: 'text-[18px] font-semibold leading-[120%]',
  T3_Semibold: 'text-[16px] font-semibold leading-[120%]',
  T4_Regular: 'text-[16px] font-normal leading-[140%]',
  B1_Semibold: 'text-[14px] font-semibold leading-[120%]',
  B2_Medium: 'text-[14px] font-medium leading-[140%]',
  B3_Regular: 'text-[14px] font-normal leading-[140%]',
  C1_Semibold: 'text-[13px] font-semibold leading-[120%]',
  C2_Regular: 'text-[13px] font-normal leading-[140%]',
  C3_Regular: 'text-[12px] font-normal leading-[120%]',
};

export const colorStyles = {
  black: 'text-black',
  white: 'text-white',
  'gray-900': 'text-[var(--color-gray-900)]',
  'gray-800': 'text-[var(--color-gray-800)]',
  'gray-700': 'text-[var(--color-gray-700)]',
  'gray-600': 'text-[var(--color-gray-600)]',
  'gray-500': 'text-[var(--color-gray-500)]',
  'gray-400': 'text-[var(--color-gray-400)]',
  'gray-300': 'text-[var(--color-gray-300)]',
  'gray-200': 'text-[var(--color-gray-200)]',
  'gray-100': 'text-[var(--color-gray-100)]',
  brown: 'text-[#381F1F]',
  primary: 'text-[var(--color-primary)]',
};
