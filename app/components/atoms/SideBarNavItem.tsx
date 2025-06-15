import clsx from 'clsx';
import { NavLink } from 'react-router';

export default function SideBarNavItem({
  to,
  title,
  onClick,
}: {
  to: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? 'var(--color-primary)' : '',
      })}
      className={clsx(
        'flex items-center gap-2 px-5 py-5 font-[var(--text-t3--font-weight)] text-[var(--text-t3)] hover:text-[var(--color-primary)]',
      )}
      onClick={onClick}
    >
      {title}
    </NavLink>
  );
}
