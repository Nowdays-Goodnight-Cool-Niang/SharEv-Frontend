import { Link } from 'react-router';
import Logo from './Logo';
import PersonSvg from '@/assets/icons/ic_person.svg?react';

interface HeaderProps {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="wrapper sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 py-3.5">
      <Link to={'/event'}>
        <Logo></Logo>
      </Link>

      {isLoggedIn && (
        <Link to={`/setting`}>
          <PersonSvg />
        </Link>
      )}
    </header>
  );
}

export default Header;
