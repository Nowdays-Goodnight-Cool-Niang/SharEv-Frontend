import toast from 'react-hot-toast';

/**
 * 커스텀 스타일의 토스트 메시지를 표시합니다.
 *
 * @param icon - 사용할 아이콘
 * @param message - 표시할 메시지 (줄바꿈 `\n` 가능)
 */

export function showCustomToast({ icon, message }: { icon?: string; message: string }) {
  return toast.custom(
    (t) => (
      <div
        className={`flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 backdrop-blur-sm transition-all duration-300 transform ${t.visible ? 'animate-toast-in' : 'animate-toast-out'}`}
      >
        {icon && (
          <div className="flex h-6 w-6 flex-col items-center justify-center rounded-full bg-white text-sm text-gray-700">
            {icon}
          </div>
        )}

        <div>
          {message.split('\n').map((line, index) => (
            <p className="tracking-tight text-gray-700" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
    {
      duration: 2000,
      position: 'bottom-center',
    }
  );
}
