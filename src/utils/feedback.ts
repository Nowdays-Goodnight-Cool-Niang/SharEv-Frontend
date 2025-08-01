import * as Sentry from '@sentry/react';

export const openFeedbackForm = async () => {
  console.log('Opening Sentry feedback form...');

  try {
    const feedback = Sentry.getFeedback();

    if (feedback) {
      console.log('Found Sentry feedback instance, creating form...');
      const form = await feedback.createForm();
      if (form) {
        console.log('Form created successfully, opening...');
        form.appendToDom();

        // Autofocus 이슈 방지를 위해 약간의 지연 후 열기
        setTimeout(() => {
          form.open();
        }, 100);

        return true;
      }
    }

    console.warn('Sentry feedback instance not found, using fallback API');

    // 폴백: Sentry.captureFeedback API 사용
    const userFeedback = prompt(
      '어떤 점이 불편하셨나요? 개선사항이나 버그를 알려주세요!\n\n💡 이 피드백은 Sentry를 통해 개발팀에게 전달됩니다.'
    );

    if (userFeedback && userFeedback.trim()) {
      Sentry.captureFeedback({
        name: '익명 사용자',
        email: 'anonymous@example.com',
        message: userFeedback.trim(),
      });

      console.log('User feedback sent to Sentry via API:', userFeedback);
      alert('소중한 의견 감사합니다! 🙏\nSentry를 통해 개발팀이 확인하겠습니다.');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error handling feedback:', error);
    alert('피드백 수집 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    return false;
  }
};
