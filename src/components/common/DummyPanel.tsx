import { dummyLogin, dummySignup } from '@/apis/dummy';
import { useState } from 'react';

export default function DummyPanel() {
  const [open, setOpen] = useState(false);
  const [kakaoId, setKakaoId] = useState(0);

  const handleGenerateId = () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    setKakaoId(id);
  };

  const handleSignup = async () => {
    try {
      const res = await dummySignup({ kakaoId });
      console.log('[회원가입 성공]', res);
      alert('회원가입 성공: ' + res.kakaoId);
    } catch (err) {
      console.error('[회원가입 실패]', err);
      alert('회원가입 실패');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await dummyLogin({ kakaoId });
      console.log('[로그인 성공]', res);
      alert('로그인 성공: ' + res.kakaoId);
    } catch (err) {
      console.error('[로그인 실패]', err);
      alert('로그인 실패');
    }
  };

  return (
    <div className="fixed -right-4 bottom-20 z-50 w-full text-sm">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mb-2 rounded bg-black px-4 py-2 text-white shadow"
      >
        {open ? '패널 접기' : '더미 패널 열기'}
      </button>

      {open && (
        <div className="max-w-80 space-y-3 rounded-xl border bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Kakao ID</span>
            <button
              onClick={handleGenerateId}
              className="rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
            >
              랜덤 생성
            </button>
          </div>
          <div className="rounded bg-gray-50 px-3 py-2 font-mono text-gray-600">
            {kakaoId || '생성된 ID 없음'}
          </div>

          <button
            onClick={handleSignup}
            disabled={!kakaoId}
            className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            더미 회원가입
          </button>

          <button
            onClick={handleLogin}
            disabled={!kakaoId}
            className="w-full rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 disabled:opacity-50"
          >
            더미 로그인
          </button>
        </div>
      )}
    </div>
  );
}
