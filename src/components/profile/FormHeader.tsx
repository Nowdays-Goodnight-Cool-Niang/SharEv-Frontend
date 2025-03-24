interface FormHeaderProps {
  content: string;
}

function FormHeader({ content }: FormHeaderProps) {
  return (
    <header>
      <h1 className="text-title-1 text-gray-50">{content}</h1>
    </header>
  );
}

export default FormHeader;
