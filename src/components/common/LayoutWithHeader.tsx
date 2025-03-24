import { Outlet, useLocation } from 'react-router';
import Header from './Header';

function LayoutWithHeader() {
  const location = useLocation();
  const isSetupProfile = location.pathname !== '/profile-setup';
  // TODO: 백엔드에서 로그인시 리다이렉트 예정이라 url로 임시 판단 - 프로필 입력한 유저가 재접속한 경우에는 별도 논의 필요

  return (
    <div className="h-full">
      {/* TODO: 유진님이 wrapper 클래스로 변경하시면 적용하기 */}
      <Header isLoggedIn={isSetupProfile} />
      <div className="px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithHeader;
