import { PropsWithChildren } from 'react';

interface SocialIconProps extends PropsWithChildren {
  link?: string;
}

function SocialIcon({ link, children }: SocialIconProps) {
  console.log(link, !link);
  return (
    <a href={link} className={`text-gray-700 ${link && 'hover:cursor-pointer'}`}>
      <li className={`flex h-5 w-5 items-center justify-center ${!link && 'opacity-10'}`}>
        {children}
      </li>
    </a>
  );
}

export default SocialIcon;
