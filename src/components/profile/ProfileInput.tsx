interface IProfileInput {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileInput({ placeholder, value, onChange }: IProfileInput) {
  return (
      <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-body2 px-2 py-[.6rem] rounded-[.4rem] placeholder:text-gray-100 text-gray-500 bg-gray-30 border border-solid border-gray-100"
      />
  );
}

export default ProfileInput;