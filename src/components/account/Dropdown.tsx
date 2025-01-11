import { useEffect, useState } from 'react';

interface IDropdownProps {
  options: string[];
  idx:number;

  name?: string;
  value: { selectValue: string; inputValue: string };
  onChange: ( field: { selectValue: string; inputValue: string }) => void;
  // selectedKeys: string[];
}

function Dropdown({ options,name, value, onChange,  }: IDropdownProps) {
  const [selectValue, setSelectValue] = useState(value.selectValue);
  const [inputValue, setInputValue] = useState(value.inputValue);

  useEffect(() => {
    onChange({selectValue, inputValue});
  }, [selectValue, inputValue]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  
  // const filteredOptions = options.filter((option) => !selectedKeys.includes(option));

  return (
    <div className='flex'>
      <select
        className='w-32 rounded-lg border bg-gray-50 border-gray-70 p-3 text-base mt-2 h-11'
        {...(name && { name })}
        disabled={true}
        value={selectValue}
        onChange={(e) => handleSelectChange(e)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type='url'
        {...(name && { name })}
        onChange={handleInputChange}
        placeholder={'링크를 입력해 주세요'}
        className='w-full flex-grow rounded-lg border bg-gray-50 border-gray-70 p-3 text-base placeholder:text-gray-100 mt-2 ml-1 h-11'
      />
    </div>
  );
}

export default Dropdown;
