import { Link, useLocation } from 'react-router';
import ProfileSvg from '@/assets/icons/ic_profile.svg?react';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const location = useLocation();
  const hideProfileIcon = [
    '/event',
    '/setting',
    '/terms',
    '/privacy',
    '/privacy-consent',
    '/profile-setup',
    '/profile-edit',
    '/account-deletion',
  ].includes(location.pathname);

  return (
    <header className="wrapper sticky top-0 z-50 flex min-h-14 items-center justify-between bg-white text-gray-900 backdrop-blur-md dark:bg-gray-900/80">
      <h1 className="text-lg font-semibold leading-none tracking-tight dark:text-gray-200">
        {title}
      </h1>

      {!hideProfileIcon && (
        <Link to={`/setting`}>
          <ProfileSvg width={28} height={28} className="dark:text-gray-200" />
        </Link>
      )}
    </header>
  );
}

export default Header;
