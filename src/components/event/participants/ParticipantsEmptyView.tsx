import EmptyWallet from '@/assets/icons/ic_empty_wallet.svg?react';

export default function ParticipantsEmptyView() {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-gray-50 py-10">
      <EmptyWallet width={60} height={60} className="mb-7 mt-4" />
      <div className="flex flex-col gap-2 text-center">
        <p className="text-lg font-medium leading-7 tracking-tight text-gray-600">
          앗! 아직 이벤트에 참가한 <br />
          다른 참가자가 없어요
        </p>
        <p className="leading-6 tracking-tight text-gray-400">
          곧 다른 참가자들도 이벤트에 참여할 거예요
          <br />
          조금만 기다려 주세요
        </p>
      </div>
    </div>
  );
}
