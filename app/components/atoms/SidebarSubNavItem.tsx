import { NavLink } from 'react-router';
import type { SideBarSectionItems } from '@/types/components';
import clsx from 'clsx';

export default function SidebarSubNavItem({
  to,
  title,
  onClick,
}: SideBarSectionItems) {
  return (
    <NavLink
      to={to}
      style={{ fontSize: 'text-[var(--text-b3)]' }}
      className={({ isActive }) =>
        clsx(
          'flex w-full items-center gap-2 px-5 py-3 leading-[var(--text-b3--line-height)] font-[var(--text-b3--font-weight)]',
          isActive
            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
            : 'hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]',
        )
      }
      onClick={onClick}
    >
      {title}
    </NavLink>
  );
}
