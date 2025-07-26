export function getEventStatus(startDate: Date, endDate: Date): 'upcoming' | 'ongoing' | 'ended' {
  const now = new Date();
  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'ended';
  return 'ongoing';
}

export function getStatusText(status: 'ongoing' | 'upcoming' | 'ended') {
  switch (status) {
    case 'ongoing':
      return '진행중';
    case 'upcoming':
      return '예정';
    case 'ended':
      return '종료';
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'ongoing':
      return 'bg-blue-500 text-blue-50 dark:text-blue-200 dark:bg-blue-500/40';
    case 'upcoming':
      return 'bg-gray-50 text-gray-600 dark:bg-gray-400/10 dark:text-gray-300';
    case 'ended':
      return 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500';
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  }
}

export function isButtonDisabled(status: 'ongoing' | 'upcoming' | 'ended') {
  return status === 'upcoming' || status === 'ended';
}

export function getParticipationText(
  status: 'ongoing' | 'upcoming' | 'ended',
  isParticipating: boolean
) {
  if (status === 'ended') return '종료됨';
  if (status === 'upcoming') return '곧 시작됩니다';
  return isParticipating ? '네트워킹하러 가기' : '참여하기';
}

export function getParticipationButtonStyle(status: 'ongoing' | 'upcoming' | 'ended') {
  if (status === 'ended' || status === 'upcoming') {
    return 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500';
  }

  return 'bg-blue-500 text-white hover:bg-blue-400';
}
