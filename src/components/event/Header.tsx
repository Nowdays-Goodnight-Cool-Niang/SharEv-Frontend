import Logo from "../common/Logo";

function Header() {
  return (
    <header className="flex items-center justify-between sticky py-3 px-6 z-10 top-0 bg-white">
      <Logo></Logo>
      <button>큐알</button>
      <div className="rounded-full w-6 h-6 bg-gray-70"></div>
    </header>
  );
}

export default Header;
