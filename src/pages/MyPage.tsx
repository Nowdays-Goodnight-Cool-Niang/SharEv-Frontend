import MySection from '@/components/mypage/MySection';
import Header from '@/components/common/Header';

function MyPage() {
  return (
    <>
      <main className="background min-h-screen bg-gray-50">
        <Header title="마이페이지" showBackButton />
        <MySection />
      </main>
    </>
  );
}

export default MyPage;
