import { Link } from 'react-router';
import Header from '@/components/common/Header';

function PrivacyPolicy() {
  const tocLinkClass =
    'text-body-3 block text-gray-600 hover:text-gray-800 hover:underline transition-colors duration-200';

  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="개인정보 처리방침" showBackButton />

      <div className="wrapper py-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-title-3 mb-4 text-gray-800">목차</h3>
              <nav className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <a href="#article1" className={tocLinkClass}>
                  제1조 개인정보의 처리 목적, 처리 항목, 보유 및 이용 기간
                </a>
                <a href="#article2" className={tocLinkClass}>
                  제2조 개인정보의 처리 및 보유기간
                </a>
                <a href="#article3" className={tocLinkClass}>
                  제3조 개인정보의 제3자 제공
                </a>
                <a href="#article4" className={tocLinkClass}>
                  제4조 개인정보 처리의 위탁
                </a>
                <a href="#article5" className={tocLinkClass}>
                  제5조 개인정보의 국외 이전에 관한 사항
                </a>
                <a href="#article6" className={tocLinkClass}>
                  제6조 정보주체의 권리·의무 및 그 행사방법
                </a>
                <a href="#article7" className={tocLinkClass}>
                  제7조 개인정보의 파기 절차 및 방법에 관한 사항
                </a>
                <a href="#article8" className={tocLinkClass}>
                  제8조 개인정보의 안전성 확보 조치
                </a>
                <a href="#article9" className={tocLinkClass}>
                  제9조 개인정보 보호책임자
                </a>
                <a href="#article10" className={tocLinkClass}>
                  제10조 권익침해 구제방법
                </a>
                <a href="#article11" className={tocLinkClass}>
                  제11조 개인정보 처리방침의 변경
                </a>
              </nav>
            </div>

            <div className="text-center">
              <p className="text-body-3 text-gray-700">
                SharE:v(이하 "서비스")는 정보주체의 자유와 권리 보호를 위해 ｢개인정보 보호법｣ 및
                관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고
                있습니다. 이에 ｢개인정보 보호법｣ 제30조 에 따라 정보주체에게 개인정보의 처리와
                보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수
                있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다
              </p>
              <p className="text-body-3 mt-3 font-medium text-orange-600">
                ※ SharE:v 서비스는 만 14세 이상 가입 및 이용 가능한 서비스로 만 14세 미만의 아동에
                대해서는 회원 가입을 받지 않습니다.
              </p>
            </div>

            <section id="article1">
              <h2 className="text-title-2 mb-4 text-gray-800">
                제1조 개인정보의 처리 목적, 처리 항목, 보유 및 이용 기간
              </h2>
              <p className="text-body-3 mb-4 text-gray-700">
                서비스는 「개인정보 보호법」에 따라 서비스 제공을 위해 필요 최소한의 범위에서
                개인정보를 수집·이용합니다.
              </p>

              <div className="mb-4">
                <h3 className="text-body-2 mb-2 text-gray-700">개인정보 수집 방법</h3>
                <ul className="text-body-3 list-outside list-disc space-y-1 pl-4 text-gray-600">
                  <li>웹사이트를 통한 회원 가입 시 이용자가 직접 입력</li>
                  <li>카카오 소셜 로그인 연동을 통한 수집</li>
                  <li>서비스 이용 과정에서 자동으로 생성·수집되는 정보 (쿠키, 로그 등)</li>
                </ul>
              </div>

              {/* 아이패드 이상 화면용 테이블 */}
              <div className="mb-4 hidden rounded-lg bg-gray-50 p-4 lg:block">
                <table className="text-body-3 w-full text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="px-2 pb-2 text-left text-gray-800">법적 근거</th>
                      <th className="px-2 pb-2 text-left text-gray-800">구분</th>
                      <th className="px-2 pb-2 text-left text-gray-800">처리 목적</th>
                      <th className="px-2 pb-2 text-left text-gray-800">처리 항목</th>
                      <th className="px-2 pb-2 text-left text-gray-800">처리 및 보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="px-2 py-3 align-top">
                        「개인정보 보호법」
                        <br />
                        제15조제1항제4호
                        <br />
                        (계약 체결·이행)
                      </td>
                      <td className="px-2 py-3 align-top">회원 서비스 운영</td>
                      <td className="px-2 py-3 align-top">
                        회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
                        유지·관리
                      </td>
                      <td className="px-2 py-3 align-top">카카오 계정 정보(이메일, 닉네임)</td>
                      <td className="px-2 py-3 align-top">회원 탈퇴 시까지</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-3 align-top">
                        「개인정보 보호법」
                        <br />
                        제15조제1항제4호
                        <br />
                        (계약 체결·이행)
                      </td>
                      <td className="px-2 py-3 align-top">네트워킹 서비스 제공</td>
                      <td className="px-2 py-3 align-top">
                        이벤트 참가자 관리, 네트워킹 카드 생성 및 공유
                      </td>
                      <td className="px-2 py-3 align-top">
                        SNS 계정(Github, Instagram, LinkedIn), 소속 정보, 행사별 커스텀 문항
                      </td>
                      <td className="px-2 py-3 align-top">
                        서비스 이용 목적 달성시까지
                        <br />
                        (이벤트 종료 후 1년)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-3 align-top">
                        「개인정보 보호법」
                        <br />
                        제15조제1항제4호
                        <br />
                        (계약 체결·이행)
                      </td>
                      <td className="px-2 py-3 align-top">서비스 운영 및 보안</td>
                      <td className="px-2 py-3 align-top">
                        서비스 제공, 본인 인증, 부정 이용 방지, 오류 해결, 보안 유지
                      </td>
                      <td className="px-2 py-3 align-top">
                        IP주소, 쿠키, 접속 로그, 기기정보(OS, 브라우저 버전), 서비스 이용 기록
                      </td>
                      <td className="px-2 py-3 align-top">
                        회원 탈퇴 시 또는
                        <br />
                        수집일로부터 1년
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 모바일/태블릿용 카드 레이아웃 */}
              <div className="mb-4 space-y-4 lg:hidden">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">법적 근거</h4>
                      <p className="text-body-4 text-gray-600">
                        「개인정보 보호법」 제15조제1항제4호 (계약 체결·이행)
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">구분</h4>
                      <p className="text-body-4 text-gray-600">회원 서비스 운영</p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 목적</h4>
                      <p className="text-body-4 text-gray-600">
                        회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
                        유지·관리
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 항목</h4>
                      <p className="text-body-4 text-gray-600">카카오 계정 정보(이메일, 닉네임)</p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">
                        처리 및 보유 기간
                      </h4>
                      <p className="text-body-4 text-gray-600">회원 탈퇴 시까지</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">법적 근거</h4>
                      <p className="text-body-4 text-gray-600">
                        「개인정보 보호법」 제15조제1항제4호 (계약 체결·이행)
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">구분</h4>
                      <p className="text-body-4 text-gray-600">네트워킹 서비스 제공</p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 목적</h4>
                      <p className="text-body-4 text-gray-600">
                        이벤트 참가자 관리, 네트워킹 카드 생성 및 공유
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 항목</h4>
                      <p className="text-body-4 text-gray-600">
                        SNS 계정(Github, Instagram, LinkedIn), 소속 정보, 행사별 커스텀 문항
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">
                        처리 및 보유 기간
                      </h4>
                      <p className="text-body-4 text-gray-600">
                        서비스 이용 목적 달성시까지 (이벤트 종료 후 1년)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">법적 근거</h4>
                      <p className="text-body-4 text-gray-600">
                        「개인정보 보호법」 제15조제1항제4호 (계약 체결·이행)
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">구분</h4>
                      <p className="text-body-4 text-gray-600">서비스 운영 및 보안</p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 목적</h4>
                      <p className="text-body-4 text-gray-600">
                        서비스 제공, 본인 인증, 부정 이용 방지, 오류 해결, 보안 유지
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">처리 항목</h4>
                      <p className="text-body-4 text-gray-600">
                        IP주소, 쿠키, 접속 로그, 기기정보(OS, 브라우저 버전), 서비스 이용 기록
                      </p>
                    </div>
                    <div>
                      <h4 className="text-body-4 mb-1 font-medium text-gray-700">
                        처리 및 보유 기간
                      </h4>
                      <p className="text-body-4 text-gray-600">
                        회원 탈퇴 시 또는 수집일로부터 1년
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="article2">
              <h2 className="text-title-2 mb-4 text-gray-800">제2조 개인정보의 처리 및 보유기간</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집
                  시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                </p>
                <ul className="text-body-3 list-outside list-disc space-y-2 pl-4 text-gray-600">
                  <li>회원 탈퇴 시까지 (회원이 탈퇴를 요청하거나 회원에서 제명된 때)</li>
                  <li>다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지</li>
                </ul>
                <div className="ml-8">
                  <ul className="text-body-3 list-outside list-disc space-y-1 pl-4 text-gray-600">
                    <li>
                      관계법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사
                      종료시까지
                    </li>
                    <li>
                      웹사이트 이용에 따른 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지
                    </li>
                  </ul>
                </div>
                <p className="text-body-3 mt-3 text-gray-600">③ 관계법령에 따른 보존 기간:</p>
                <ul className="text-body-3 ml-4 list-outside list-disc space-y-1 pl-4 text-gray-600">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                  <li>로그인 기록: 3개월 (통신비밀보호법)</li>
                </ul>
              </div>
            </section>

            <section id="article3">
              <h2 className="text-title-2 mb-4 text-gray-800">제3조 개인정보의 제3자 제공</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
                  내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및
                  제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 현재 개인정보를 제3자에게 제공하고 있지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 향후 개인정보를 제3자에게 제공하는 경우 정보주체에게 제공받는 자, 제공받는 자의
                  이용목적, 제공하는 개인정보의 항목, 제공받는 자의 보유·이용기간을 사전에 고지하고
                  동의를 받겠습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ④ 개인정보를 국외의 제3자에게 제공하는 경우는 '제5조 개인정보의 국외 이전에 관한
                  사항'에서 안내하고 있습니다.
                </p>
              </div>
            </section>

            <section id="article5">
              <h2 className="text-title-2 mb-4 text-gray-800">
                제5조 개인정보의 국외 이전에 관한 사항
              </h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 다음과 같이 개인정보를 국외로 이전하고 있습니다.
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <table className="text-body-3 w-full text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="pb-2 text-left text-gray-700">이전받는 자</th>
                        <th className="pb-2 text-left text-gray-700">이전목적</th>
                        <th className="pb-2 text-left text-gray-700">이전되는 항목</th>
                        <th className="pb-2 text-left text-gray-700">이전국가 및 일시</th>
                        <th className="pb-2 text-left text-gray-700">보유·이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-2">Mixpanel Inc.</td>
                        <td className="py-2">서비스 이용 분석 및 개선</td>
                        <td className="py-2">이용자 행동 분석 정보, 기기 정보</td>
                        <td className="py-2">미국 / 수집 즉시</td>
                        <td className="py-2">수집일로부터 2년</td>
                      </tr>
                      <tr>
                        <td className="py-2">Google LLC</td>
                        <td className="py-2">웹사이트 트래픽 분석</td>
                        <td className="py-2">웹사이트 이용 통계, IP 주소, 쿠키</td>
                        <td className="py-2">미국 등 / 수집 즉시</td>
                        <td className="py-2">수집일로부터 26개월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-body-3 mt-3 text-gray-600">
                  ② 개인정보의 국외 이전 시 개인정보보호법 제28조의8에 따라 다음과 같은 조치를
                  취합니다:
                </p>
                <ul className="text-body-3 ml-4 list-outside list-disc space-y-1 pl-4 text-gray-600">
                  <li>개인정보 이전 계약 체결 및 이전받는 자의 개인정보보호 수준 확인</li>
                  <li>개인정보의 암호화 등 안전성 확보조치</li>
                  <li>이전현황 및 계획의 개인정보보호위원회 신고</li>
                </ul>
              </div>
            </section>

            <section id="article4">
              <h2 className="text-title-2 mb-4 text-gray-800">제4조 개인정보 처리의 위탁</h2>
              <div className="space-y-3">
                <p className="text-body-3 mb-2 text-gray-600">
                  ① 서비스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를
                  위탁하고 있습니다.
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <table className="text-body-3 w-full text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="pb-2 text-left">위탁받는 자</th>
                        <th className="pb-2 text-left">위탁업무</th>
                        <th className="pb-2 text-left">위탁기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-2">카카오</td>
                        <td className="py-2">소셜 로그인 서비스</td>
                        <td className="py-2">회원탈퇴시 또는 위탁계약 종료시까지</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-2">AWS</td>
                        <td className="py-2">데이터 보관 및 인프라 운영</td>
                        <td className="py-2">회원 탈퇴 시 또는 위탁 계약 종료시까지</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-2">Mixpanel Inc.</td>
                        <td className="py-2">서비스 이용 분석 및 통계</td>
                        <td className="py-2">회원 탈퇴 시 또는 위탁 계약 종료시까지</td>
                      </tr>
                      <tr>
                        <td className="py-2">Google LLC</td>
                        <td className="py-2">웹사이트 트래픽 분석</td>
                        <td className="py-2">회원 탈퇴 시 또는 위탁 계약 종료시까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외
                  개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독,
                  손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를
                  안전하게 처리하는지를 감독하고 있습니다.
                </p>
              </div>
            </section>

            <section id="article6">
              <h2 className="text-title-2 mb-4 text-gray-800">
                제6조 정보주체의 권리·의무 및 그 행사방법
              </h2>
              <div className="space-y-3">
                <p className="text-body-3 mb-2 text-gray-600">
                  ① 정보주체는 서비스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할
                  수 있습니다.
                </p>
                <ul className="text-body-3 list-outside list-disc space-y-2 pl-4 text-gray-600">
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정·삭제 요구</li>
                  <li>처리정지 요구</li>
                </ul>
                <p className="text-body-3 text-gray-600">
                  ② 제1항에 따른 권리 행사는 서비스에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을
                  통하여 하실 수 있으며 서비스는 이에 대해 지체 없이 조치하겠습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 서비스는
                  정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
                </p>
              </div>
            </section>

            <section id="article7">
              <h2 className="text-title-2 mb-4 text-gray-800">
                제7조 개인정보의 파기 절차 및 방법에 관한 사항
              </h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
                  때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                </p>
                <ul className="text-body-3 ml-4 list-outside list-disc space-y-2 pl-4 text-gray-600">
                  <li>
                    파기절차: 불필요한 개인정보 및 개인정보파일은 개인정보 보호책임자의 승인을 거쳐
                    파기
                  </li>
                  <li>
                    파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
                    파기
                  </li>
                </ul>
              </div>
            </section>

            <section id="article8">
              <h2 className="text-title-2 mb-4 text-gray-800">제8조 개인정보의 안전성 확보 조치</h2>
              <p className="text-body-3 mb-2 text-gray-600">
                서비스는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고
                있습니다.
              </p>
              <ul className="text-body-3 list-outside list-disc space-y-2 pl-4 text-gray-600">
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                <li>
                  기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치,
                  개인정보의 암호화, 보안프로그램 설치
                </li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </section>

            <section id="article9">
              <h2 className="text-title-2 mb-4 text-gray-800">제9조 개인정보 보호책임자</h2>
              <div className="space-y-3">
                <p className="text-body-3 mb-2 text-gray-600">
                  ① 서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                  정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                  지정하고 있습니다.
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="text-body-3 space-y-2 text-gray-600">
                    <p>
                      <strong className="text-gray-700">▶ 개인정보 보호책임자</strong>
                    </p>
                    <p>성명: 권나연</p>
                    <p>연락처: chichoc.dev@gmail.com</p>
                  </div>
                </div>
                <p className="text-body-3 text-gray-600">
                  ② 정보주체께서는 서비스의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련
                  문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로
                  문의하실 수 있습니다. 서비스는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
                  것입니다.
                </p>
              </div>
            </section>

            <section id="article10">
              <h2 className="text-title-2 mb-4 text-gray-800">제10조 권익침해 구제방법</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보보호위원회,
                  한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수
                  있습니다.
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="text-body-3 space-y-2 text-gray-600">
                    <p>
                      <strong className="text-gray-700">▶ 개인정보보호위원회:</strong> (국번없이)
                      1833-6972 (privacy.go.kr)
                    </p>
                    <p>
                      <strong className="text-gray-700">▶ 개인정보침해신고센터:</strong> (국번없이)
                      118 (privacy.go.kr)
                    </p>
                    <p>
                      <strong className="text-gray-700">▶ 대검찰청:</strong> (국번없이) 1301
                      (spo.go.kr)
                    </p>
                    <p>
                      <strong className="text-gray-700">▶ 경찰청:</strong> (국번없이) 182
                      (ecrm.cyber.go.kr)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="article11">
              <h2 className="text-title-2 mb-4 text-gray-800">제11조 개인정보 처리방침의 변경</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의
                  추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여
                  고지할 것입니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 단, 수집하는 개인정보의 항목, 이용·제공 목적의 변경 등과 같이 정보주체 권익의
                  중대한 변경이 발생할 때에는 최소 30일 전에 고지하며, 필요시 정보주체 동의를 다시
                  받겠습니다.
                </p>
              </div>
            </section>

            <div className="space-y-4 text-center">
              <div className="text-body-3 py-6 text-gray-600">
                <div className="text-body-3 space-y-2 text-gray-600">
                  <p>약관 버전: v0.0.0</p>
                  <p>공고일자: 2025.07.20</p>
                  <p>시행일자: 2025.08.02</p>
                </div>
              </div>
              <Link to="/" className="text-body-3 text-orange-500 hover:text-orange-400">
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
