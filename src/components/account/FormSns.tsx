import Input from '../common/Input';

interface IFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormSns({ handleChange }: IFormProps) {
  return (
    <>
      <Input
        labelName="LinkedIn"
        placeholder="01012341234"
        name="linkedIn"
        onChange={handleChange}
      />
      <Input labelName="Github" placeholder="Github 아이디" name="github" onChange={handleChange} />
      <Input
        labelName="Instagram"
        placeholder="Instagram 아이디"
        name="instagram"
        onChange={handleChange}
      />
    </>
  );
}

export default FormSns;
