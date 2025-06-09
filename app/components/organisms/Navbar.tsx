import Logo from '../atoms/Logo';
import NavMenu from '../molecules/NavMenu';

export default function Navbar() {
  return (
    <div className="h-25 w-full">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-x-24 px-4 sm:px-6 lg:px-8">
        <Logo />
        <NavMenu />
      </div>
    </div>
  );
}
