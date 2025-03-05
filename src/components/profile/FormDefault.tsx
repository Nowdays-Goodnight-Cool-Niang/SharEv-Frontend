import Input from '../common/Input';

interface IFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormDefault({ handleChange }: IFormProps) {
  return (
    <>
      <Input
        labelName="이름"
        placeholder="홍길동"
        name="name"
        required={true}
        onChange={handleChange}
      />
      <Input
        labelName="이메일"
        placeholder="example@ex.com"
        name="email"
        required={true}
        onChange={handleChange}
      />
    </>
  );
}

export default FormDefault;
