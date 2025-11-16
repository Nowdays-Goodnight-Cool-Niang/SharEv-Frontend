interface CalendarIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function CalendarIcon({ className = 'text-gray-500', width = 16, height = 16 }: CalendarIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 1V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 1V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CalendarIcon;
