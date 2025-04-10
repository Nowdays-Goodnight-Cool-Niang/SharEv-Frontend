import FormHeader from '../components/profile/FormHeader';
import MySection from '../components/mypage/MySection';

function MyPage() {
  return (
    <main className="wrapper pt-11">
      <FormHeader content="마이페이지" />
      <MySection />
    </main>
  );
}

export default MyPage;
