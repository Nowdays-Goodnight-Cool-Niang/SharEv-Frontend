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
      if (value && !/^https?:\/\/.+/.test(value)) {
        return '올바른 형식의 URL을 입력해주세요.';
      }
      break;

    case 'githubUrl':
      if (value && !/^https?:\/\/.+/.test(value)) {
        return '올바른 형식의 URL을 입력해주세요.';
      }
      break;

    case 'instagramUrl':
      if (value && !/^https?:\/\/.+/.test(value)) {
        return '올바른 형식의 URL을 입력해주세요.';
      }
      break;

    default:
      return '';
  }
};
