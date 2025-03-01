import { useEffect, useLayoutEffect, useState } from 'react';
import ButtonTertiary from '../common/ButtonTertiary';

interface IImgFormProps {
  setFormAccount: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

function ImgForm({ setFormAccount }: IImgFormProps) {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const getRandomNumber = () => {
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1).filter(
      (num) => num !== 4 && num !== 5
    );
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  };

  const handleAvatarRamdom = () => {
    const number = getRandomNumber();
    setRandomNumber(number);
  };

  useLayoutEffect(() => {
    handleAvatarRamdom();
  }, []);

  useEffect(() => {
    setFormAccount((prevData) => ({ ...prevData, profileImageId: randomNumber }));
  }, [randomNumber]);

  return (
    <label className="mt-6 block">
      <span className="text-label text-gray-200">이미지</span>
      <div className="mt-2 flex flex-col items-center justify-center">
        <img
          src={`../../../src/assets/images/avatars/${randomNumber}.png`}
          alt="randomAvatar"
          className="mb-3 h-24 w-24 rounded-full border border-gray-300"
        />
        <ButtonTertiary
          onClick={(e) => {
            e.preventDefault();
            handleAvatarRamdom();
          }}
        >
          랜덤으로 바꾸기
        </ButtonTertiary>
      </div>
    </label>
  );
}

export default ImgForm;
