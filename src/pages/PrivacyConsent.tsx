import { Link } from 'react-router';
import Header from '@/components/common/Header';

function PrivacyConsent() {
  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="개인정보 수집 및 이용 동의서" />

      <div className="wrapper py-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-body-3 text-gray-700">
                SharE:v(이하 "서비스")는 ｢개인정보 보호법｣ 제15조, 제22조, 제24조 및 관계 법령에
                따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리하기
                위하여 다음과 같이 개인정보 수집 및 이용에 대한 동의를 받고 있습니다.
              </p>
              <p className="text-body-3 mt-3 font-medium text-orange-600">
                ※ 만 14세 미만 아동은 가입할 수 없습니다.
              </p>
            </div>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">1. 개인정보의 수집 및 이용 목적</h2>
              <ul className="text-body-3 ml-4 list-inside list-disc space-y-2 text-gray-600">
                <li>회원 가입의사 확인 및 본인 인증</li>
                <li>이벤트 참가자 관리 및 네트워킹 카드 서비스 제공</li>
                <li>서비스 제공 및 부정 이용 방지</li>
                <li>고객 문의사항 응답 및 서비스 개선</li>
              </ul>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">2. 수집하는 개인정보의 항목</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-title-3 mb-2 text-gray-700">필수 항목</h3>
                  <p className="text-body-3 text-gray-600">
                    카카오 계정 정보(이메일, 닉네임), 이름, 소속 정보, 서비스 이용 기록
                  </p>
                </div>
                <div>
                  <h3 className="text-title-3 mb-2 text-gray-700">선택 항목</h3>
                  <p className="text-body-3 text-gray-600">
                    SNS 계정(Github, Instagram, LinkedIn), 행사별 커스텀 질문 응답
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">3. 개인정보의 보유 및 이용 기간</h2>
              <div className="rounded-lg bg-gray-50 p-4">
                <ul className="text-body-3 list-inside list-disc space-y-1 text-gray-600">
                  <li>회원 계정 정보: 회원 탈퇴 시까지</li>
                  <li>네트워킹 서비스 정보: 이벤트 종료 후 1년</li>
                  <li>서비스 이용 기록: 회원 탈퇴 시 또는 1년</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">4. 동의 거부 권리 및 불이익</h2>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="text-body-3 text-orange-800">
                  <strong>필수 항목</strong> 동의 거부 시: 회원가입 및 서비스 이용 불가
                  <br />
                  <strong>선택 항목</strong> 동의 거부 시: 기본 서비스 이용에는 제한 없음
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">5. 개인정보 처리 위탁</h2>
              <p className="text-body-3 text-gray-600">카카오: 소셜 로그인 서비스 제공</p>
            </section>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-body-3 text-blue-800">
                <strong>더 자세한 내용</strong>은{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  개인정보처리방침
                </Link>
                에서 확인하실 수 있습니다.
              </p>
            </div>

            <div className="space-y-4 border-t pt-6 text-center">
              <div className="text-body-3 text-gray-600">
                <div className="flex justify-center space-x-8">
                  <div>동의서 버전: v0.0.0</div>
                  <div>시행일자: 2025.07.20</div>
                </div>
              </div>
              <Link
                to="/"
                className="text-body-3 inline-block text-orange-500 hover:text-orange-600 hover:underline"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyConsent;
