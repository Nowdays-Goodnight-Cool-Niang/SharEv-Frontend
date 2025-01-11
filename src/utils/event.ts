export const getEventStatus = (startedAt: Date, endedAt: Date): string => {
  const today = new Date();

  if (today < startedAt) {
    return "진행 예정";
  } else if (today >= startedAt && today <= endedAt) {
    return "진행 중";
  } else {
    return "종료";
  }
};
