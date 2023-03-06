import errorIcon from '../../assets/not_varifayed.svg';
import fraudDetectedIcon from '../../assets/fraud.svg';
import successIcon from '../../assets/varifayed.svg';
import enrollFailed from '../../assets/enroll_failed.svg';
import enrollDone from '../../assets/enroll_done.svg';

export const statusesMap = new Map([
  [
    'voice-not-verified',
    {
      text: 'Not verified',
      icon: errorIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    'fraud-detected',
    {
      text: 'Fraud',
      icon: fraudDetectedIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    'voice-verified',
    {
      text: 'Verified',
      icon: successIcon,
      isSuccess: true,
      btnText: 'OK',
      type: 'hide',
    },
  ],
  [
    'timeout-exceeded',
    {
      text: `The operation is not finished. Please, try again.`,
      icon: errorIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    'enroll-not-passed',
    {
      text: 'Voice signature creation failed',
      icon: enrollFailed,
      isEnroll: true,
      isSuccess: false,
      btnText: 'Try again',
      type: 'show',
    },
  ],
  [
    'enroll-passed',
    {
      text: `Voice signature created successfully`,
      icon: enrollDone,
      isEnroll: true,
      isSuccess: true,
      btnText: 'OK',
      type: 'show',
    },
  ],
]);
