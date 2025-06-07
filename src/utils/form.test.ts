import { describe, it, expect } from 'vitest';
import { validateInput } from './form';

describe('validateInput', () => {
  it('이름이 비어있으면 에러 반환', () => {
    expect(validateInput('name', '')).toBe('이름을 입력해주세요.');
  });

  it('이메일이 올바르지 않으면 에러 반환', () => {
    expect(validateInput('email', 'test@com')).toBe('올바른 형식의 이메일이어야 합니다.');
  });

  it('정상적인 이름과 이메일은 에러 없음', () => {
    expect(validateInput('name', '홍길동')).toBeUndefined();
    expect(validateInput('email', 'test@example.com')).toBeUndefined();
  });
});
