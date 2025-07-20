import { Link } from 'react-router';
import Header from '@/components/common/Header';

function TermsOfService() {
  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="이용약관" />

      <div className="wrapper py-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제1조 (목적)</h2>
              <p className="text-body-3 text-gray-600">
                이 약관은 SharE:v(이하 "서비스")가 제공하는 이벤트 네트워킹 및 프로필 공유 서비스의
                이용과 관련하여 서비스와 이용자 간의 권리ㆍ의무 및 책임사항, 기타 필요한 사항을
                규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제2조 (정의)</h2>
              <p className="text-body-3 mb-2 text-gray-600">
                이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
              </p>
              <ul className="text-body-3 list-inside list-disc space-y-2 text-gray-600">
                <li>"서비스"란 SharE:v 플랫폼 및 관련 서비스를 의미합니다.</li>
                <li>"이용자"란 이 약관에 따라 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>
                  "회원"이란 서비스 이용계약을 체결하고 이용자 아이디(ID)를 부여받은 자를
                  의미합니다.
                </li>
                <li>
                  "쉐어카드란 회원의 이름, 이메일, 행사별 커스텀 정보 등을 기재해 놓은 카드를
                  의미합니다.
                </li>
              </ul>
              <p className="text-body-3 mb-2 text-gray-600">
                이 약관에서 사용하는 용어의 정의는 본 조 제1항에서 정하는 것을 제외하고는 관계법령
                및 서비스별 정책에서 정하는 바에 의하며, 이에 정하지 아니한 것은 일반적인 상 관례에
                따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제3조 (약관의 효력 및 변경)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 이 약관의 내용을 회원이 알 수 있도록 서비스 내 또는 그 연결화면에
                  게시합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한
                  법률」, 「정보통신망이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령에 위배하지
                  않는 범위에서 이 약관을 개정할 수 있습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 서비스가 약관을 개정할 경우에는 적용일자 및 개정내용, 개정사유 등을 명시하여
                  최소한 그 적용일 7일 이전부터 서비스 내 또는 그 연결화면에 게시하여 회원에게
                  공지합니다. 다만, 변경된 내용이 회원에게 불리하거나 중대한 사항의 변경인 경우에는
                  그 적용일 30일 이전까지 본문과 같은 방법으로 공지하고 제28조 제1항의 방법으로
                  회원에게 통지합니다. 이 경우 개정 전 내용과 개정 후 내용을 명확하게 비교하여
                  회원이 알기 쉽도록 표시합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ④ 서비스가 약관을 개정할 경우 개정약관 공지 후 개정약관의 적용에 대한 회원의 동의
                  여부를 확인합니다. 서비스는 제2항의 공지 또는 통지를 할 경우 회원이 개정약관에
                  대해 동의 또는 거부의 의사표시를 하지 않으면 동의한 것으로 볼 수 있다는 내용도
                  함께 공지 또는 통지를 하며, 회원이 이 약관 시행일까지 거부의 의사표시를 하지
                  않는다면 개정약관에 동의한 것으로 간주합니다. 회원이 개정약관에 대해 동의하지 않는
                  경우 서비스는 회원과의 계약을 해지할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제4조 (이용계약의 체결 및 적용)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 이용계약은 이용자가 약관의 내용에 대하여 동의를 하고 서비스가 그 신청에 대하여
                  승낙함으로써 체결됩니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 가입신청자의 신청에 대하여 승낙함을 원칙으로 합니다. 다만, 서비스는
                  다음 각 호의 어느 하나에 해당하는 이용 신청에 대해서는 승낙을 거절하거나 사후에
                  이용계약을 해지할 수 있습니다.
                </p>
                <ul className="text-body-3 ml-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위의 정보를 기재하거나, 서비스가 제시하는 내용을 기재하지 않은 경우</li>
                  <li>
                    기타 회원으로 등록하는 것이 서비스의 기술상 현저히 지장이 있다고 판단되는 경우
                  </li>
                  <li>그 밖에 각 호에 준하는 사유로서 승낙이 부적절하다고 판단되는 경우</li>
                </ul>
                <p className="text-body-3 text-gray-600">
                  ③ 서비스는 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을
                  유보할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제5조 (약관 외 준칙)</h2>
              <p className="text-body-3 text-gray-600">
                이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 「전자상거래 등에서의
                소비자보호에 관한 법률」,「약관의 규제에 관한 법률」,「정보통신망이용촉진 및
                정보보호 등에 관한 법률」 등 관련 법령 또는 상 관례에 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제6조 (개인정보보호)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며,
                  개인정보의 보호 및 사용에 대해서는 관련 법령 및 서비스의 개인정보처리방침에
                  따릅니다. 다만, 서비스가 제공하는 서비스 이외의 링크된 서비스에서는
                  개인정보처리방침이 적용되지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스의 특성에 따라 회원의 이름, 이메일, SNS 링크 등 자신을 소개하는 내용이
                  공개될 수 있습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 서비스는 관련 법령에 의해 관련 국가기관 등의 요청이 있는 경우를 제외하고는
                  회원의 개인정보를 본인의 동의 없이 타인에게 제공하지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ④ 서비스는 회원의 귀책사유로 개인정보가 유출되어 발생한 피해에 대하여 책임을 지지
                  않습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제7조 (서비스의 의무)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 관련 법령, 이 약관에서 정하는 권리의 행사 및 의무의 이행을 신의에 따라
                  성실하게 준수합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를
                  위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다. 서비스는
                  이 약관 및 개인정보처리방침에서 정한 경우를 제외하고는 회원의 개인정보가 제3자에게
                  공개 또는 제공되지 않도록 합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 서비스는 계속적이고 안정적인 서비스의 제공을 위하여 서비스 개선을 하던 중 설비에
                  장애가 생기거나 데이터 등이 멸실․훼손된 때에는 천재지변, 비상사태, 현재의 기술로는
                  해결이 불가능한 장애나 결함 등 부득이한 사유가 없는 한 지체 없이 이를 수리 또는
                  복구하도록 최선의 노력을 다합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제8조 (회원의 의무)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 회원은 서비스의 이용과 관련하여 다음 각 호에 해당하는 행위를 해서는 안 됩니다.
                </p>
                <ul className="text-body-3 ml-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>이용신청 또는 회원 정보 변경 시 허위사실을 기재하는 행위</li>
                  <li>
                    서비스의 직원이나 운영자를 가장하거나 타인의 명의를 도용하여 메일을 발송하는
                    행위, 타인으로 가장하거나 타인과의 관계를 허위로 명시하는 행위
                  </li>
                  <li>다른 회원의 개인정보를 무단으로 수집⋅저장⋅게시 또는 유포하는 행위</li>
                  <li>
                    도박 등 사행행위를 하거나 유도하는 행위, 음란⋅저속한 정보를 교류⋅게재하거나 음란
                    사이트를 연결(링크)하는 행위
                  </li>
                  <li>
                    서비스를 무단으로 영리, 영업, 광고, 홍보, 정치활동, 선거운동 등 본래의 용도
                    이외의 용도로 이용하는 행위
                  </li>
                  <li>
                    서비스를 이용하여 얻은 정보를 무단으로 복제․유통․조장하거나 상업적으로 이용하는
                    행위, 알려지거나 알려지지 않은 버그를 악용하여 서비스를 이용하는 행위
                  </li>
                  <li>
                    타인을 기망하여 이득을 취하는 행위, 서비스의 서비스의 이용과 관련하여 타인에게
                    피해를 입히는 행위
                  </li>
                  <li>
                    서비스나 타인의 지적재산권 또는 초상권을 침해하는 행위, 타인의 명예를 훼손하거나
                    손해를 가하는 행위
                  </li>
                  <li>서비스 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>
                    법령에 의하여 전송 또는 게시가 금지된 정보(컴퓨터 프로그램)나 컴퓨터
                    소프트웨어⋅하드웨어 또는 전기통신장비의 정상적인 작동을 방해⋅파괴할 목적으로
                    고안된 바이러스⋅컴퓨터 코드⋅파일⋅프로그램 등을 고의로 전송⋅게시⋅유포 또는
                    사용하는 행위
                  </li>
                  <li>
                    서비스로부터 특별한 권리를 부여 받지 않고 애플리케이션을 변경하거나,
                    애플리케이션에 다른 프로그램을 추가⋅삽입하거나, 서버를 해킹⋅역설계하거나, 소스
                    코드나 애플리케이션 데이터를 유출⋅변경하거나, 별도의 서버를 구축하거나,
                    웹사이트의 일부분을 임의로 변경⋅도용하여 서비스를 사칭하는 행위
                  </li>
                  <li>그 밖에 관련 법령에 위반되거나 선량한 풍속 기타 사회통념에 반하는 행위</li>
                </ul>
                <p className="text-body-3 text-gray-600">
                  ② 회원의 계정 및 모바일 기기에 관한 관리 책임은 회원에게 있으며, 이를 타인이
                  이용하도록 하게 하여서는 안 됩니다. 모바일 기기의 관리 부실이나 타인에게 이용을
                  승낙함으로 인해 발생하는 손해에 대해서 서비스는 책임을 지지 않습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제9조 (서비스 내용 및 변경)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 원활한 게임서비스 제공을 위해 운영상 또는 기술상의 필요에 따라 서비스를 변경할
                  수 있으며, 변경 전에 해당 내용을 게임서비스 내에 공지합니다. 다만, 버그․오류 등의
                  수정이나 긴급 업데이트 등 부득이하게 변경할 필요가 있는 경우 또는 중대한 변경에
                  해당하지 않는 경우에는 사후에 공지할 수 있습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스가 변경되거나 중지된 원인이 서비스의 고의 또는 중대한 과실로 인한 경우를
                  제외하고는 서비스의 변경 및 중지로 발생하는 문제에 대해서 책임을 부담하지 않습니다
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제10조 (정보의 수집)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 원활하고 안정적인 운영 및 서비스 품질의 개선을 위하여 회원의 개인정보를
                  제외한 회원의 모바일 기기 정보(설정, 사양, 운영체제, 버전 등)를 수집 ‧ 활용할 수
                  있습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스 개선 및 회원 대상 서비스 소개 등을 위한 목적으로 회원에게 추가정보를
                  요청할 수 있습니다. 이 요청에 대해 회원은 승낙하거나 거절할 수 있으며, 서비스가 이
                  요청을 할 경우에는 회원이 이 요청을 거절할 수 있다는 뜻을 함께 고지합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제11조 (저작권 등의 귀속)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스 내의 콘텐츠에 대한 저작권과 기타 지적재산권은 서비스에 귀속합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 회원이 게시하거나 등록하는 서비스 내의 콘텐츠에 대해 제8조 제1항에 따른
                  금지행위에 해당된다고 판단되는 경우에는 사전 통지 없이 이를 삭제 또는 이동하거나
                  그 등록을 거절할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">
                제12조 (회원에 대한 서비스 이용제한)
              </h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스는 다음 각 호의 사유에 대한 조사가 완료될 때까지 해당 계정의 서비스 이용을
                  정지할 수 있습니다.
                </p>
                <ul className="text-body-3 ml-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>계정이 해킹 또는 도용당했다는 정당한 신고가 접수된 경우</li>
                  <li>불법프로그램 사용자 또는 작업장 등 위법행위자로 의심되는 경우</li>
                  <li>그 밖에 각 호에 준하는 사유로 서비스 이용의 잠정조치가 필요한 경우</li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ② 서비스가 제19조 제1항에서 정한 이용제한 조치를 하는 경우에는 다음 각 호의 사항을
                  회원에게 사전 통지합니다. 다만, 긴급히 조치할 필요가 있는 경우에는 사후에 통지할
                  수 있습니다.
                </p>
                <ul className="text-body-3 ml-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>이용제한 조치의 사유</li>
                  <li>이용제한 조치의 유형 및 기간</li>
                  <li>이용제한 조치에 대한 이의신청 방법</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제12조 (계약 해지)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 회원은 언제든지 서비스 이용을 원하지 않는 경우 회원 탈퇴를 통해 이용계약을
                  해지할 수 있습니다. 회원탈퇴로 인해 회원이 서비스 내에서 보유한 이용정보는 모두
                  삭제되어 복구가 불가능하게 됩니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 회원이 본 이용계약을 해지할 경우, 관련 법령 및 서비스의 개인정보보호정책에서
                  정한 바에 따라 서비스가 회원정보를 보유하는 경우를 제외하고는, 해지 즉시 회원이
                  등록한 정보 등 모든 데이터는 소멸됩니다
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제13조 (손해배상 및 면책조항)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 회원은 본 약관을 위반하여 상대방에게 손해를 입힌 경우에는 그 손해를 배상할
                  책임이 있습니다. 다만, 고의 또는 과실이 없는 경우에는 그러하지 아니 합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는
                  경우에는 서비스 제공에 관하여 책임을 지지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ③ 서비스는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 기타 이에 준하는 사유로
                  발생한 손해에 대하여 책임을 지지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ④ 서비스는 회원의 고의 또는 과실로 인한 서비스 이용의 장애에 대하여는 책임을 지지
                  않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ⑤ 회원이 서비스와 관련하여 게재한 정보나 자료 등의 신뢰성, 정확성 등에 대하여
                  서비스는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ⑥ 서비스는 무료로 제공되는 서비스 이용과 관련하여 회원에게 발생한 손해에 대해서는
                  책임을 지지 않습니다. 그러나 서비스의 고의 또는 중과실에 의한 경우에는 그러하지
                  아니합니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ⑦ 서비스는 회원이 서비스를 이용하여 기대하는 이익을 얻지 못하거나 상실한 것에
                  대하여 책임을 지지 않습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ⑧ 회원이 모바일 기기의 변경, 모바일 기기의 번호 변경, 운영체제(OS) 버전의 변경,
                  해외 로밍, 통신사 변경 등으로 인해 콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우
                  서비스는 이에 대해 책임을 지지 않습니다. 다만, 서비스의 고의 또는 과실에 의한
                  경우에는 그러하지 아니합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제14조 (회원에 대한 통지)</h2>
              <div className="space-y-3">
                <p className="text-body-3 text-gray-600">
                  ① 서비스가 회원에게 통지를 하는 경우 회원의 전자우편주소, 문자메시지(LMS/SMS)
                  등으로 할 수 있습니다.
                </p>
                <p className="text-body-3 text-gray-600">
                  ② 서비스는 회원 전체에게 통지를 하는 경우 7일 이상 서비스 내에 게시하거나 팝업화면
                  등을 제시함으로써 제1항의 통지에 갈음할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-title-2 mb-4 text-gray-800">제15조 (재판권 및 준거법)</h2>
              <p className="text-body-3 text-gray-600">
                이 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 서비스와 회원 간에 발생한
                분쟁으로 소송이 제기되는 경우에는 법령에 정한 절차에 따른 법원을 관할 법원으로
                합니다.
              </p>
            </section>

            <div className="space-y-4 text-center">
              <div className="text-body-3 py-6 text-gray-600">
                <ul className="text-body-3 list-inside space-y-2 text-gray-600">
                  <li>약관 버전: v0.0.0</li>
                  <li>공고일자: 2025.07.20</li>
                  <li>시행일자: 2025.08.02</li>
                </ul>
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

export default TermsOfService;
