import { Link } from 'react-router';
import Logo from './Logo';
import PersonSvg from '../../assets/icons/ic_person.svg?react';

interface HeaderProps {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="wrapper sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 py-3.5">
      <Link to={'/'}>
        {/* TODO: 로고 클릭시 어디로 이동시킬지 논의 필요 (기존에는 행사 조회 페이지였으나, 0.0.1버전에는 포함X) - MVP버전은 홈이 로그인 화면 > 홈으로 이동시 로그아웃 or 행사 상세(event)를 띄우기  */}
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
