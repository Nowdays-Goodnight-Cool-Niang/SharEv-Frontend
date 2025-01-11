import { useState } from 'react';
import ButtonSecondary from '../common/ButtonSecondary';
import Dropdown from './Dropdown';

interface ISnsFormProps {
  name?: string;
  onChange: (data: { [key: string]: string }) => void;
}

function SnsForm({ onChange }: ISnsFormProps) {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { selectValue: '', inputValue: '' }]);
  };

  const handleFieldChange = (index: number, field: { selectValue: string; inputValue: string }) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);

    const data = newFields.reduce((acc, curr) => {
      if (curr.selectValue) {
        acc[curr.selectValue] = curr.inputValue;
      }
      return acc;
    }, {} as { [key: string]: string });

    onChange(data);
  };

  return (
    <label className='block mt-6'>
      <span className='text-label text-gray-200'>SNS</span>
      <div className='mt-2'>
        {fields.map((field, idx) => (
          <Dropdown
            key={idx}
            options={['github', 'instagram', 'facebook ']}
            value={field}
            onChange={(selectValue, inputValue) => handleFieldChange(idx, { selectValue, inputValue })}
          />
        ))}
        <ButtonSecondary onClick={handleAddField}>추가하기 +</ButtonSecondary>
      </div>
    </label>
  );
}

export default SnsForm;
