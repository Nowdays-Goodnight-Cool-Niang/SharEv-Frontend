export const validateInput = (name: string, value: string) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return '이름을 입력해주세요.';
      if (value.length < 2) return '이름은 2글자 이상이어야 합니다.';
      if (/[^a-zA-Z가-힣0-9\s]/.test(value)) return '이름에 특수문자는 사용할 수 없습니다.';
      break;
    case 'email':
      if (!value.trim()) return '이메일을 입력해주세요.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 형식의 이메일이어야 합니다.';
      break;
    case 'linkedinUrl':
      if (value && !/^www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(value)) {
        return '올바른 형식의 Url이어야 합니다. (예: linkedin.com/in/3~30자의 문자, 숫자, 하이픈만 허용)';
      }
      break;

    case 'githubUrl':
      if (value && !/^github\.com\/[a-zA-Z0-9-]{1,39}$/.test(value)) {
        return '올바른 형식의 Url이어야 합니다. (예: github.com/1~39자의 문자, 숫자, 하이픈만 허용))';
      }
      break;

    case 'instagramUrl':
      if (value && !/^instagram\.com\/[a-zA-Z0-9._]{1,30}$/.test(value)) {
        return '올바른 형식의 Url이어야 합니다. (예: instagram.com/1~30자의 영문, 숫자, 밑줄, 마침표만 허용)';
      }
      break;

    default:
      return '';
  }
};
