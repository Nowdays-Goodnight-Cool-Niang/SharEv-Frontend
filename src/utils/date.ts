export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayName = days[date.getDay()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} (${dayName}) ${hours}:${minutes}`;
}
