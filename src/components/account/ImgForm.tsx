import { useLayoutEffect, useState } from 'react';
import ButtonTertiary from '../common/ButtonTertiary';

function ImgForm() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const getRandomNumber = () => {
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1).filter((num) => num !== 4 && num !== 5);
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

  return (
    <label className='block mt-6'>
      <span className='text-label text-gray-200'>이미지</span>
      <div className='mt-2 flex flex-col justify-center items-center'>
        <img
          src={`../../../src/assets/images/avatars/${randomNumber}.png`}
          alt='randomAvatar'
          className='w-24 h-24 rounded-full border border-gray-300 mb-3'
        />
        <ButtonTertiary onClick={handleAvatarRamdom}>랜덤으로 바꾸기</ButtonTertiary>
      </div>
    </label>
  );
}

export default ImgForm;
