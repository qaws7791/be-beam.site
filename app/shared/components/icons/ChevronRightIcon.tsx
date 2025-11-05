import React from 'react';

interface ChevronRightIconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  width?: string | number;
  height?: string | number;
  strokeColor?: string;
  strokeWidth?: string | number;
}

/**
 * 오른쪽 방향 화살표(Chevron Right) 아이콘 컴포넌트
 *
 * @param {string | number} [size] - width와 height를 동시에 설정할 때 사용합니다.
 * @param {string | number} [width='8'] - 아이콘의 넓이.
 * @param {string | number} [height='14'] - 아이콘의 높이.
 * @param {string} [strokeColor='#333333'] - 선의 색상.
 * @param {string | number} [strokeWidth='1.5'] - 선의 두께.
 * @param {React.SVGProps<SVGSVGElement>} [restProps] - 그 외 SVG props (className 등).
 * @returns {React.FC} SVG Component
 */
const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  size,
  width = '8',
  height = '14',
  strokeColor = '#333333',
  strokeWidth = '1.5',
  ...restProps
}) => {
  const finalWidth = size || width;
  const finalHeight = size || height;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M1 1L6.92929 6.92929C6.96834 6.96834 6.96834 7.03166 6.92929 7.07071L1 13"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;
