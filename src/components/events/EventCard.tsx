import { EVENT_ID } from '@/constants/eventId';
import { useQueryParticipateInEvent } from '@/hooks/useQueryParticipateInEventMutation';
import toast from 'react-hot-toast';
import EventImg from '@/assets/images/img_event.png';

export default function EventCard() {
  const { mutate } = useQueryParticipateInEvent();

  return (
    <div className="rounded-3xl border border-gray-200">
      <div className="aspect-video w-full border-b border-gray-200 bg-slate-200">
        <img src={EventImg} alt="object-cover" />
      </div>
      <div className="px-6 py-6">
        <p className="mb-1 text-xs leading-6 tracking-tight text-gray-600">GDG Campus Korea</p>
        <h1 className="text-lg font-medium leading-6 tracking-tight text-gray-900">
          2025 I/O Extended: CODE:ME - 개발자 퍼스널 브랜딩 with AI
        </h1>

        <button
          className="mt-4 w-full rounded-xl bg-gray-900 py-4 font-semibold tracking-tight text-white"
          onClick={() => {
            mutate(EVENT_ID, {
              onSuccess: () => toast.success('행사에 참여하였습니다!'),
              onError: () => toast.error('해당 행사에 이미 참여하셨습니다.'),
            });
          }}
        >
          참여하기
        </button>
      </div>
    </div>
  );
}
