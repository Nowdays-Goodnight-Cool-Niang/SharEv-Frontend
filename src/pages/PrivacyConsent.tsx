import { Link, useNavigate } from 'react-router';
import Header from '@/components/common/Header';
import useScrollToTop from '@/hooks/useScrollToTop';
import BaseButton from '@/components/common/BaseButton';

function PrivacyConsent() {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <div className="background flex flex-col bg-white dark:bg-gray-950">
      <Header title="개인정보 수집 및 이용 동의서" showBackButton />

      <div className="pb-14 pt-6">
        <div className="rounded-xl bg-white p-6 text-sm leading-7 tracking-tight text-gray-600 shadow-sm dark:text-gray-300">
          <div className="space-y-6">
            <div className="space-y-4 text-center">
              <p className="">
                SharE:v(이하 "서비스")는 ｢개인정보 보호법｣ 제15조, 제22조, 제24조 및 관계 법령에
                따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리하기
                위하여 다음과 같이 개인정보 수집 및 이용에 대한 동의를 받고 있습니다.
              </p>
              <p className="font-medium text-gray-900">※ 만 14세 미만 아동은 가입할 수 없습니다.</p>
            </div>

            <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 dark:bg-gray-900">
              <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
                1. 개인정보의 수집 및 이용 목적
              </h2>
              <div className="rounded-lg bg-white p-2">
                <ul className="ml-4 list-inside list-disc">
                  <li>회원 가입의사 확인 및 본인 인증</li>
                  <li>이벤트 참가자 관리 및 네트워킹 카드 서비스 제공</li>
                  <li>서비스 제공 및 부정 이용 방지</li>
                  <li>고객 문의사항 응답 및 서비스 개선</li>
                </ul>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 dark:bg-gray-900">
              <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
                2. 수집하는 개인정보의 항목
              </h2>
              <div className="space-y-2">
                <div>
                  <h3 className="font-medium">필수 항목</h3>
                  <p>카카오 계정 정보(이메일, 닉네임), 이름, 소속 정보, 서비스 이용 기록</p>
                </div>
                <div>
                  <h3 className="font-medium">선택 항목</h3>
                  <p>SNS 계정(Github, Instagram, LinkedIn), 행사별 커스텀 질문 응답</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 dark:bg-gray-900">
              <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <div className="rounded-lg bg-white p-2">
                <ul className="ml-4 list-inside list-disc">
                  <li>회원 계정 정보: 회원 탈퇴 시까지</li>
                  <li>네트워킹 서비스 정보: 이벤트 종료 후 1년</li>
                  <li>서비스 이용 기록: 회원 탈퇴 시 또는 1년</li>
                </ul>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 dark:bg-gray-900">
              <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
                4. 동의 거부 권리 및 불이익
              </h2>
              <div className="rounded-xl bg-red-50/80 px-4 py-3">
                <p className="text-red-600">
                  <strong>필수 항목</strong> 동의 거부 시: 회원가입 및 서비스 이용 불가
                  <br />
                  <strong>선택 항목</strong> 동의 거부 시: 기본 서비스 이용에는 제한 없음
                </p>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 dark:bg-gray-900">
              <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
                5. 개인정보 처리 위탁
              </h2>
              <p className="text-gray-600">카카오: 소셜 로그인 서비스 제공</p>
            </section>

            <div className="rounded-xl bg-gray-100 p-3">
              <p className="text-gray-500">
                <strong>더 자세한 내용</strong>은{' '}
                <Link to="/privacy" className="font-medium text-blue-500 hover:underline">
                  개인정보처리방침
                </Link>
                에서 확인하실 수 있습니다.
              </p>
            </div>

            <div className="text-center">
              <ul className="mb-8 text-xs font-medium leading-5 tracking-tight text-gray-600 dark:text-gray-400">
                <div>동의서 버전: v0.0.0</div>
                <div>시행일자: 2025.07.20</div>
              </ul>

              <BaseButton onClick={() => navigate(-1)}>뒤로가기</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyConsent;
