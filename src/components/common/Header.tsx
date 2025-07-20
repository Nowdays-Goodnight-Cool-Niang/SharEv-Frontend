import { Link } from 'react-router';
import ProfileSvg from '@/assets/icons/ic_profile.svg?react';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="wrapper sticky top-0 z-10 flex h-14 items-center justify-between bg-gradient-to-b from-black/20 to-black/0 backdrop-blur-lg dark:bg-gray-900/80">
      <h1 className="text-title-1 text-white dark:text-gray-200">{title}</h1>

      <Link to={`/setting`}>
        <ProfileSvg width={28} height={28} className="text-white dark:text-gray-200" />
      </Link>
    </header>
  );
}

export default Header;
