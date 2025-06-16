import { describe, it, expect } from 'vitest';
import { validateInput } from './form';

describe('validateInput', () => {
  it('이름 공백', () => {
    expect(validateInput('name', '')).toBe('이름을 입력해주세요.');
  });
  it('이름 1글자', () => {
    expect(validateInput('name', '홍')).toBe('이름은 2글자 이상이어야 합니다.');
  });
  it('이름 특수문자 포함', () => {
    expect(validateInput('name', '홍길동!')).toBe('이름에 특수문자는 사용할 수 없습니다.');
  });
  it('이름 정상', () => {
    expect(validateInput('name', '홍길동')).toBeUndefined();
  });

  it('이메일 공백', () => {
    expect(validateInput('email', '')).toBe('이메일을 입력해주세요.');
  });
  it('이메일 도메인', () => {
    expect(validateInput('email', 'test@com')).toBe('올바른 형식의 이메일이어야 합니다.');
  });
  it('이메일 정상', () => {
    expect(validateInput('email', 'test@example.com')).toBeUndefined();
  });

  it('LinkedIn 글자수', () => {
    expect(validateInput('linkedinUrl', 'linkedin.com/in/ab')).toMatch(
      '올바른 형식의 링크를 입력해주세요. (예: linkedin.com/in/3~30자의 문자, 숫자, 하이픈만 허용)'
    );
  });
  it('LinkedIn 정상', () => {
    expect(validateInput('linkedinUrl', 'linkedin.com/in/abc123')).toBeUndefined();
  });
  it('LinkedIn 공백', () => {
    expect(validateInput('linkedinUrl', '')).toBeUndefined();
  });
});
