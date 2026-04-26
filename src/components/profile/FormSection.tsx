import Input from '@/components/common/Input';

interface IFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  validationMessages: { [key: string]: string };
  formName: string;
  formEmail: string;
}

const defaultFields = [
  { labelName: '이름', placeholder: '홍길동', name: 'name', required: true },
  { labelName: '이메일', placeholder: 'example@ex.com', name: 'email', required: true },
];

function FormSection({
  handleChange,
  handleBlur,
  validationMessages,
  formName,
  formEmail,
}: IFormProps) {
  const fields = defaultFields;
  const values: Record<string, string> = { name: formName, email: formEmail };

  return (
    <>
      <h2 className="text-title-3 mb-3 font-semibold tracking-tight text-gray-700 md:mb-4 md:text-base">
        기본 정보
      </h2>
      {fields.map((data) => (
        <Input
          key={data.name}
          labelName={data.labelName}
          placeholder={data.placeholder}
          name={data.name}
          value={values[data.name] || ''}
          required={data.required}
          onChange={handleChange}
          onBlur={handleBlur}
          validationMessage={validationMessages[data.name] || ''}
        />
      ))}
    </>
  );
}

export default FormSection;
