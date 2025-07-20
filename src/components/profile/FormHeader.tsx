interface FormHeaderProps {
  content: string;
}

function FormHeader({ content }: FormHeaderProps) {
  return (
    <header className="flex h-14 items-center">
      <h1 className="text-title-1 text-gray-800 dark:text-gray-50">{content}</h1>
    </header>
  );
}

export default FormHeader;
