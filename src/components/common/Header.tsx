import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3">
      <Logo></Logo>
      <div className="h-6 w-6 rounded-full bg-gray-70"></div>
    </header>
  );
}

export default Header;
