import { useState, useEffect } from 'react';
import type { Team } from '@/types/domain/team';

/**
 * 팀 목록을 가져오는 커스텀 훅
 * 현재는 Mock 데이터를 반환하지만, 추후 API 연동 시 교체 예정
 */
export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);

        // TODO: API 호출로 교체
        // const response = await teamAPI.getMyTeams();
        // setTeams(response.data);

        // Mock 데이터 (임시)
        await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션

        const mockTeams: Team[] = [
          {
            id: '1',
            certificationCode: 'CERTIFICATED',
            title: 'GDC Campus Korea',
            content: '개발자 커뮤니티를 위한 다양한 행사 기획하고 운영합니다.',
            participantCount: 24,
            activateFlag: true,
            createAt: '2024-01-15T00:00:00Z',
            updateAt: '2024-01-15T00:00:00Z',
          },
          {
            id: '2',
            certificationCode: 'CERTIFICATED',
            title: 'Tech Valley Seoul',
            content: '서울의 스타트업과 개발자들을 위한 네트워킹 공간',
            participantCount: 18,
            activateFlag: true,
            createAt: '2024-06-10T00:00:00Z',
            updateAt: '2024-06-10T00:00:00Z',
          },
          {
            id: '3',
            certificationCode: 'NONE',
            title: 'Startup Korea',
            content: '한국 스타트업 생태계를 만들어가는 사람들',
            participantCount: 42,
            activateFlag: true,
            createAt: '2023-12-01T00:00:00Z',
            updateAt: '2023-12-01T00:00:00Z',
          },
          {
            id: '4',
            certificationCode: 'NONE',
            title: '나연의 개인 팀',
            content: '개인 프로젝트 및 소규모 행사를 위한 팀',
            participantCount: 3,
            activateFlag: true,
            createAt: '2024-09-20T00:00:00Z',
            updateAt: '2024-09-20T00:00:00Z',
          },
        ];

        setTeams(mockTeams);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('팀 목록을 불러오는데 실패했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, isLoading, error };
}
