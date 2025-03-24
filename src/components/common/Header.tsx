import { Link } from 'react-router';
import Logo from './Logo';
import PersonSvg from '../../assets/icons/ic_person.svg?react';

interface HeaderProps {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: HeaderProps) {
  const userId = 11111;
  // TODO: request 헤더에서 userId 읽어와야 함 - HttpOnly 설정된 쿠키라 이전 카카오로그인 API가 동작되어야 가져올 수 있음

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 px-6 py-3.5">
      <Link to={'/'}>
        <Logo></Logo>
      </Link>

      {isLoggedIn && (
        <Link to={`/user/${userId}`}>
          <PersonSvg />
        </Link>
      )}
    </header>
  );
}

export default Header;
