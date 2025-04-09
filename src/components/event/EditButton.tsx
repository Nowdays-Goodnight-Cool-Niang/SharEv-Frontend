import EditSvg from '@/assets/icons/ic_edit.svg?react';

interface EditButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: EditButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      className="text-button-5 flex items-center gap-0.5 rounded-[4px] bg-gray-800 p-2 text-gray-400"
      onClick={handleClick}
    >
      <EditSvg />
      수정하기
    </button>
  );
}

export default EditButton;
