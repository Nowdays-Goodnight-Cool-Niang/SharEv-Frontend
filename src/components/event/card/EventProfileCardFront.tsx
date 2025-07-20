import GithubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';
import { EventProfileState, IProfile } from '@/types';
import gradientImage from '@/assets/images/img_gradient.png';
import GraphicImage from '@/assets/images/img_graphic_9.png';

interface EventProfileCardFrontProps {
  state?: EventProfileState;
  profile: IProfile;
  eventName: string;
}

const socialIcons = [
  { name: 'linkedIn', icon: LinkedInSvg },
  { name: 'github', icon: GithubSvg },
  { name: 'instagram', icon: InstagramSvg },
] as const;

function EventProfileCardFront({
  state = EventProfileState.LOCKED,
  profile,
  eventName,
}: EventProfileCardFrontProps) {
  const renderSocialButtons = () => {
    return socialIcons.map(({ name, icon: Icon }) => {
      const url = profile.socialLinks?.[name];

      return (
        <a
          key={name}
          href={url ?? '#'}
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
            if (!url) e.preventDefault();
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border ${url ? 'border-gray-100/10 bg-gray-100/10 text-gray-200' : 'border-gray-100/5 bg-gray-100/5 text-gray-100/5'}`}
        >
          <Icon width={24} height={24} />
        </a>
      );
    });
  };

  return (
    <div
      className={`relative aspect-[3/4] h-full w-full min-w-60 overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-white/0 via-white/10 to-indigo-900/50 backdrop-blur-2xl transform-style-3d`}
    >
      <div className="absolute top-0 h-full">
        <img src={gradientImage} className="h-full object-cover opacity-5" alt="" />
      </div>
      <div className="absolute bottom-0 flex aspect-square w-full flex-col items-end justify-end">
        <div className="w-96 animate-character-enter translate-x-20 translate-y-full">
          <img src={GraphicImage} className="aspect-square w-full" alt="" />
        </div>
      </div>
      <div className="absolute inset-0 w-full pl-8 pr-6 pt-6">
        <p className="mb-8 text-right text-sm text-white/40">{eventName}</p>
        <h2 className="mb-4 text-3xl font-semibold leading-7 tracking-tight text-white">
          {profile.name}
        </h2>
        <p className="mb-2 text-base leading-7 tracking-tight text-gray-100/80">{profile.email}</p>
        <ul className="flex flex-wrap gap-1.5">{renderSocialButtons()}</ul>
      </div>
    </div>
  );
}

export default EventProfileCardFront;
