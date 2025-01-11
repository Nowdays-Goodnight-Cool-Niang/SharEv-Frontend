
interface TagProps {
    text: string;
  }

function Tag({text}: TagProps) {
    const colorMap: Record<string, { bg: string; text: string }> = {
        "종료": { bg: "bg-gray-70", text: "text-gray-300" },
        "진행 중": { bg: "bg-green-light", text: "text-green-dark" },
        "진행 예정": { bg: "bg-pink-200", text: "text-pink" },
      };

      const colors = colorMap[text] || { bg: "bg-gray-light", text: "text-gray-dark" };

    return <span className={`text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] ${colors.bg} ${colors.text}`}>
      {text}
    </span>;
  }
  

  export default Tag