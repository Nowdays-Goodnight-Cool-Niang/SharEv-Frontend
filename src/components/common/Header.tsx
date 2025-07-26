import { Link, useLocation, useNavigate } from 'react-router';
import ProfileSvg from '@/assets/icons/ic_profile.svg?react';
import ArrowLeftSvg from '@/assets/icons/ic_arrow_left.svg?react';
import { PropsWithChildren } from 'react';
import { ROUTES } from '@/constants/routes';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

function Header({ title, showBackButton = false, onBackClick }: HeaderProps) {
  const location = useLocation();
  const showProfileIcon = ['/events'].includes(location.pathname);

  const navigate = useNavigate();

  return (
    <header className="wrapper sticky top-0 z-50 flex min-h-14 items-center justify-between bg-white text-gray-900 backdrop-blur-md dark:bg-gray-900/80">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={onBackClick ?? (() => navigate(-1))}
            className="text-gray-900 dark:text-gray-200"
          >
            <ArrowLeftSvg />
          </button>
        )}
        <Title>{title}</Title>
      </div>

      {showProfileIcon && (
        <Link to={ROUTES.SETTING}>
          <ProfileSvg width={28} height={28} className="dark:text-gray-200" />
        </Link>
      )}
    </header>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-lg font-semibold leading-none tracking-tight dark:text-gray-200">
      {children}
    </h1>
  );
}

export default Header;
