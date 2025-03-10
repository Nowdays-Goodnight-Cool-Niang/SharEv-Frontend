import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between py-3.5">
      <Logo></Logo>
    </header>
  );
}

export default Header;
