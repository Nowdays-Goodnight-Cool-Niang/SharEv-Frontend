import EmailSvg from '@/assets/icons/ic_email.svg?react';
import GithubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';
import { EventProfileState, IProfile } from '@/types';
import { getGraphicImageByNumber } from '@/utils/graphic';

interface EventProfileCardFrontProps {
  state?: EventProfileState;
  profile: IProfile;
  eventName: string;
  graphicNumber: number;
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
  graphicNumber,
}: EventProfileCardFrontProps) {
  const renderSocialButtons = () => {
    return socialIcons.map(({ name, icon: Icon }) => {
      const url = profile.socialLinks?.[name];
      const fixedUrl = url?.startsWith('http') ? url : `https://${url}`;
      return (
        <a
          key={name}
          href={fixedUrl ?? '#'}
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
            if (!url) e.preventDefault();
          }}
          className={`flex h-6 w-6 items-center justify-center rounded-lg ${url ? 'text-gray-200 opacity-90' : 'opacity-10'}`}
        >
          <Icon width={20} height={20} />
        </a>
      );
    });
  };

  return (
    <div
      className={`relative h-full w-full min-w-60 overflow-hidden rounded-3xl bg-gray-900 transform-style-3d`}
    >
      <div className="absolute -bottom-10 flex aspect-square w-full flex-col items-end justify-end">
        <div className="w-[36rem] translate-x-48 translate-y-20">
          <img
            src={getGraphicImageByNumber(graphicNumber)}
            className="aspect-square w-full"
            alt=""
          />
        </div>
      </div>
      <div className="absolute inset-0 w-full pl-8 pr-6 pt-10">
        <p className="mb-3 w-full text-xl leading-7 tracking-tight text-gray-500">{eventName}</p>
        <p className="mb-8 w-full text-3xl font-semibold leading-7 tracking-tight text-white">
          {profile.name}
        </p>

        <ul className="absolute bottom-6 flex flex-wrap items-center gap-3">
          <li className="flex h-7 w-7 flex-col items-center justify-center">
            <a href={`mailto:${profile.email}`} onClick={(e) => e.stopPropagation()}>
              <EmailSvg width={20} height={20} />
            </a>
          </li>
          {renderSocialButtons()}
        </ul>
      </div>
    </div>
  );
}

export default EventProfileCardFront;
