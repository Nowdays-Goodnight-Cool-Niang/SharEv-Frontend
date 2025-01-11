import { useState } from 'react';
import ButtonSecondary from '../common/ButtonSecondary';
import Dropdown from './Dropdown';

interface ISnsFormProps {
  name?: string;
  onChange: (data: { [key: string]: string }) => void;
}

function SnsForm({ onChange }: ISnsFormProps) {
  const [fields, setFields] = useState<{ selectValue: string; inputValue: string }[]>([]);

  const handleAddField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFields((prevFields) => [...prevFields, { selectValue: '', inputValue: '' }]);
  };

  const handleFieldChange = (field: { selectValue: string; inputValue: string }) => {
    console.log("field",field)
    const newFields = {}
    newFields[field.selectValue] = field.inputValue;

    console.log(newFields)

    onChange(newFields);
  };

  return (
    <label className='block mt-6'>
      <span className='text-label text-gray-200'>SNS</span>
      <div>
        {fields.map((field, idx) => (
          <Dropdown
            key={idx}
            options={['github', 'instagram', 'facebook ']}
            value={field}
            onChange={(field) => handleFieldChange(field)}
          />
        ))}
        <ButtonSecondary onClick={(e) => handleAddField(e)}>추가하기 +</ButtonSecondary>
      </div>
    </label>
  );
}

export default SnsForm;
