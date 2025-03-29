import EditSvg from '../../assets/icons/ic_edit.svg?react';

interface EditButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: EditButtonProps) {
  return (
    <button className="text-button-5 flex items-center gap-0.5 text-gray-500" onClick={onClick}>
      <EditSvg /> 수정하기
    </button>
  );
}

export default EditButton;
