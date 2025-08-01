import { describe, test, expect } from 'vitest';
import { validateInput } from '../utils/form';

type Case = [field: string, value: string, expected: string | undefined];

describe('validateInput', () => {
  describe.each<Case>([
    ['name', '', '이름을 입력해주세요.'],
    ['name', '홍', '이름은 2글자 이상이어야 합니다.'],
    ['name', '홍길동!', '이름에 특수문자는 사용할 수 없습니다.'],
    ['name', '홍길동', undefined],

    ['email', '', '이메일을 입력해주세요.'],
    ['email', 'test@com', '올바른 형식의 이메일이어야 합니다.'],
    ['email', 'test@example.com', undefined],

    ['linkedinUrl', '', undefined],
    [
      'linkedinUrl',
      'linkedin.com/in/ab',
      '올바른 형식의 링크를 입력해주세요. (예: linkedin.com/in/3~30자의 문자, 숫자, 하이픈만 허용)',
    ],
    ['linkedinUrl', 'linkedin.com/in/abc123', undefined],
    ['linkedinUrl', 'linkedin.com/in/123', undefined],

    ['githubUrl', '', undefined],
    [
      'githubUrl',
      'github.com/',
      '올바른 형식의 링크를 입력해주세요. (예: github.com/1~39자의 문자, 숫자, 하이픈만 허용)',
    ],
    ['githubUrl', 'github.com/abc-123', undefined],
    ['githubUrl', 'github.com/123', undefined],

    ['instagramUrl', '', undefined],
    [
      'instagramUrl',
      'instagram.com/!@#',
      '올바른 형식의 링크를 입력해주세요. (예: instagram.com/1~30자의 영문, 숫자, 밑줄, 마침표만 허용)',
    ],
    ['instagramUrl', 'instagram.com/cool_niang', undefined],
  ])('%s: "%s"', (field: string, value: string, expected: string | undefined) => {
    test(`=> ${expected === undefined ? 'no error' : expected}`, () => {
      expect(validateInput(field, value)).toBe(expected);
    });
  });
});
