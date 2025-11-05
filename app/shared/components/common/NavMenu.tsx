import { cn } from '@/styles/tailwind';
import { NavLink } from 'react-router';

export default function NavMenu() {
  const navItems = [
    {
      to: '/meetings',
      label: '모임',
    },
    {
      to: '/reviews',
      label: '모임 후기',
    },
    {
      to: '/guideBooks',
      label: '가이드북',
    },
  ];

  return (
    <nav className="flex flex-1 gap-20 text-[1.125rem]">
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive, isPending }) =>
            cn(
              'text-t2 whitespace-nowrap',
              isActive ? 'text-primary' : '',
              isPending ? 'text-primary' : '',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
