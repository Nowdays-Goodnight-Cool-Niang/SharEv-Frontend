import toast from 'react-hot-toast';

export function showPreview({ message }: { message: string }) {
  toast.custom(
    (t) => (
      <div
        className={`flex flex-col items-center gap-2 rounded-2xl bg-white/85 px-5 py-5 shadow-md backdrop-blur-sm transition-all duration-300 transform ${t.visible ? 'animate-toast-in' : 'animate-toast-out'}`}
      >
        <div className="rounded-full bg-gray-700 px-3 py-0.5 text-sm font-medium tracking-tight text-white">
          명함 미리보기
        </div>
        <div>
          {message.split('\n').map((line, index) => (
            <p className="break-all leading-7 tracking-tight text-gray-500" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
    {
      duration: 2000,
      position: 'top-center',
    }
  );
}
