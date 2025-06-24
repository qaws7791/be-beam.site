import type { MeetingCardProp } from '@/components/organisms/MeetingCard';
import MeetingCard from '@/components/organisms/MeetingCard';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/date', () => ({
  formatToMonthAndDayDate: (date: string) => `Formatted(${date})`,
}));

describe('MeetingCard', () => {
  const mockOnClick = vi.fn();

  const defaultProps: MeetingCardProp = {
    image: 'https://example.com/image.jpg',
    meetingType: '스터디',
    recruitmentType: '선착순 모집',
    name: '리액트 심화 스터디',
    meetingStartTime: '2025-06-30T19:00:00',
    address: '서울특별시 강남구',
    onClick: mockOnClick,
    classNames: 'custom-class',
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('모든 텍스트와 이미지가 잘 렌더링되어야 한다', () => {
    render(<MeetingCard {...defaultProps} />);

    // 썸네일 이미지
    const image = screen.getByAltText('meeting_thumbnail') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(defaultProps.image);

    // 텍스트들
    expect(screen.getByText(defaultProps.recruitmentType)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.meetingType)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.address)).toBeInTheDocument();
    expect(
      screen.getByText(
        `모임 시작일 Formatted(${defaultProps.meetingStartTime})`,
      ),
    ).toBeInTheDocument();
  });

  it('클릭 시 onClick이 호출되어야 한다', () => {
    render(<MeetingCard {...defaultProps} />);
    const card = screen
      .getByRole('img', { name: /meeting_thumbnail/i })
      .closest('div');
    fireEvent.click(card!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('추가 className이 잘 적용되어야 한다', () => {
    render(<MeetingCard {...defaultProps} />);
    const card = screen
      .getByRole('img', { name: /meeting_thumbnail/i })
      .closest('div');
    expect(card).toHaveClass('custom-class');
  });
});
