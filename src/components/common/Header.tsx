import { Link } from 'react-router';
import Logo from './Logo';
import PersonSvg from '../../assets/icons/ic_person.svg?react';

interface HeaderProps {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 px-6 py-3.5">
      <Link to={'/'}>
        <Logo></Logo>
      </Link>

      {isLoggedIn && <PersonSvg />}
    </header>
  );
}

export default Header;
