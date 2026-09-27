import { describe, expect, test } from 'vitest';
import { validateInput } from '../utils/form';

const LINKEDIN_ERROR =
  '올바른 형식의 링크를 입력해주세요. (예: linkedin.com/in/3~30자의 문자, 숫자, 하이픈만 허용)';
const GITHUB_ERROR =
  '올바른 형식의 링크를 입력해주세요. (예: github.com/1~39자의 문자, 숫자, 하이픈만 허용)';
const INSTAGRAM_ERROR =
  '올바른 형식의 링크를 입력해주세요. (예: instagram.com/1~30자의 영문, 숫자, 밑줄, 마침표만 허용)';
const URL_ERROR = '올바른 형식의 URL을 입력해주세요.';

type ValidationCase = [value: string, expected: string | undefined];

describe('validateInput', () => {
  describe('name', () => {
    test.each<ValidationCase>([
      ['', '이름을 입력해주세요.'],
      ['홍', '이름은 2글자 이상이어야 합니다.'],
      ['홍길동!', '이름에 특수문자는 사용할 수 없습니다.'],
      ['홍길동', undefined],
    ])('입력값: "%s"', (value, expected) => {
      expect(validateInput('name', value)).toBe(expected);
    });
  });

  describe('email', () => {
    test.each<ValidationCase>([
      ['', '이메일을 입력해주세요.'],
      ['test@com', '올바른 형식의 이메일이어야 합니다.'],
      ['test@example.com', undefined],
    ])('입력값: "%s"', (value, expected) => {
      expect(validateInput('email', value)).toBe(expected);
    });
  });

  describe('url', () => {
    const validUrls = [
      '',
      'linkedin.com/in/abc123',
      'linkedin.com/in/123',
      'https://linkedin.com/in/abc123',
      'github.com/abc-123',
      'github.com/123',
      'http://github.com/abc-123',
      'instagram.com/cool_niang',
      'https://example.com/profile',
    ];

    test.each(validUrls)('유효한 URL: "%s"', (value) => {
      expect(validateInput('url', value)).toBeUndefined();
    });

    test.each<ValidationCase>([
      ['linkedin.com/in/ab', LINKEDIN_ERROR],
      ['github.com/', GITHUB_ERROR],
      ['instagram.com/!@#', INSTAGRAM_ERROR],
      ['example.com/profile', URL_ERROR],
    ])('유효하지 않은 URL: "%s"', (value, expected) => {
      expect(validateInput('url', value)).toBe(expected);
    });
  });
});
