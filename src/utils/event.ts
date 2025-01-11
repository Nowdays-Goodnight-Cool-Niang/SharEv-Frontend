export const getEventStatus = (startedAt: string, endedAt: string): string => {
  const today = new Date();
  const StartDate = new Date(startedAt);
  const endDate = new Date(endedAt);

  if (today < StartDate) {
    return "진행 예정";
  } else if (today >= StartDate && today <= endDate) {
    return "진행 중";
  } else {
    return "종료";
  }
};
