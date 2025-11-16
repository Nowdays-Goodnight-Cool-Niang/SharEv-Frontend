import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';

function ParticipatedEvents() {
  return (
    <div className="background flex min-h-full flex-col bg-gray-50">
      <Header title="참여 행사" showBackButton />
      <div className="wrapper py-6">
        <div className="text-center text-gray-500">
          <p>참여한 행사가 없습니다.</p>
        </div>
      </div>
      <BottomSpace />
    </div>
  );
}

export default ParticipatedEvents;
