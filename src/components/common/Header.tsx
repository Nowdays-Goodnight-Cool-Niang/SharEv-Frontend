import { Link, useLocation } from 'react-router';
import ProfileSvg from '@/assets/icons/ic_profile.svg?react';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const location = useLocation();

  const hideProfileIcon = ['/setting', '/terms', '/privacy', '/privacy-consent'].includes(
    location.pathname
  );

  return (
    <header className="wrapper sticky top-0 z-10 flex h-14 items-center justify-between bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-50">
      <h1 className="text-title-1 text-gray-800">{title}</h1>

      {!hideProfileIcon && (
        <Link to={`/setting`}>
          <ProfileSvg width={28} height={28} className="text-gray-700" />
        </Link>
      )}
    </header>
  );
}

export default Header;
