import { PropsWithChildren } from 'react';

interface SocialIconProps extends PropsWithChildren {
  link?: string;
}

function SocialIcon({ link, children }: SocialIconProps) {
  return (
    <a href={link} className={`${link && 'hover:cursor-pointer'}`}>
      <li
        className={`flex h-9 w-9 items-center justify-center rounded-[4px] bg-gray-700 ${!link && 'opacity-20'}`}
      >
        {children}
      </li>
    </a>
  );
}

export default SocialIcon;
