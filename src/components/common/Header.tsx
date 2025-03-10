import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between py-3.5">
      <Logo></Logo>
      {/* TODO: 로그인한 경우 프로필 아이콘 띄우기 */}
    </header>
  );
}

export default Header;
