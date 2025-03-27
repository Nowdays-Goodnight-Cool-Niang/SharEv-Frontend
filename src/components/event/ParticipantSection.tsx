import { useQueryParticipants } from '../../hooks/useQueryEventParticipants';
import { IProfile } from '../../types';
import ParticipantCard from './ParticipantCard';

function ParticipantSection() {
  const { participants, isLoading, error } = useQueryParticipants(0, 0);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  console.log(participants);

  return (
    <div className="wrapper">
      <h1 className="text-title-1 mb-5 mt-11 text-gray-50">삐약톤 캠퍼스 대항전</h1>
      <h2 className="text-title-2 mb-4 text-gray-300">행사 참여자</h2>
      <ul className="grid grid-cols-3 gap-x-3 gap-y-5">
        {participants &&
          participants.accountInfoPage.content.map((participants: IProfile) => <ParticipantCard />)}
      </ul>
    </div>
  );
}

export default ParticipantSection;
