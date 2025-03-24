import { Outlet } from 'react-router';
import Header from './Header';

function LayoutWithHeader() {
  return (
    <div className="h-full">
      {/* TODO: 유진님이 wrapper 클래스로 변경하시면 적용하기 */}
      <Header />
      <div className="px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithHeader;
