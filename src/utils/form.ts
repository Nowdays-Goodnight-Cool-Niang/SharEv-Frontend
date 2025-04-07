export const validateInput = (name: string, value: string) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return '이름을 입력해주세요.';
      if (value.length < 2) return '이름은 2글자 이상이어야 합니다.';
      if (/[^a-zA-Z가-힣0-9\s]/.test(value)) return '이름에 특수문자는 사용할 수 없습니다.';
      break;
    case 'email':
      if (!value.trim()) return '이메일을 입력해주세요.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '이메일을 올바르게 입력해주세요.';
      break;
    case 'linkedinUrl':
      if (value && !/^www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(value)) {
        return '올바르게 입력해주세요. (예: www.linkedin.com/in/ooo)';
      }
      break;

    case 'githubUrl':
      if (value && !/^github\.com\/[a-zA-Z0-9_-]+$/.test(value)) {
        return '올바르게 입력해주세요. (예: github.com/ooo)';
      }
      break;

    case 'instagramUrl':
      if (value && !/^www\.instagram\.com\/[a-zA-Z0-9_.-]+$/.test(value)) {
        return '올바르게 입력해주세요. (예: www.instagram.com/ooo)';
      }
      break;

    default:
      return '';
  }
};
