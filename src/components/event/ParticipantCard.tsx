import GtihubSvg from '../../assets/icons/ic_github.svg?react';
import LinkedInSvg from '../../assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';

function ParticipantCard() {
  return (
    <li className="max-w-28">
      <div className="relative overflow-hidden rounded-bl-md rounded-br-md bg-orange-500 px-1 pb-2 pt-6">
        <img
          src="src/assets/images/img_share_card_graphic.png"
          className="absolute w-full -translate-y-1/3 transform"
        />
        <div className="relative z-10 flex h-20 flex-col items-center justify-center rounded-md bg-gray-900">
          <span className="font-ydestreet text-xl text-gray-50">김주호</span>
          <div className="flex gap-1">
            <LinkedInSvg className="w-4" />
            <GtihubSvg className="w-4" />
            <InstagramSvg className="w-4" />
          </div>
        </div>
      </div>
      <div className="h-10 rounded-tl-md rounded-tr-md bg-gray-900"></div>
    </li>
  );
}

export default ParticipantCard;
