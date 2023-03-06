import errorIcon from '../../assets/not_varifayed.svg';
import fraudDetectedIcon from '../../assets/fraud.svg';
import successIcon from '../../assets/varifayed.svg';
import enrollFailed from '../../assets/enroll_failed.svg';
import enrollDone from '../../assets/enroll_done.svg';
import { ActionStatuses } from '../enum/actionStatuses';

export const statusesMap = new Map([
  [
    ActionStatuses.NOT_VERIFIED,
    {
      text: 'Not verified',
      icon: errorIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    ActionStatuses.FRAUD_DETECTED,
    {
      text: 'Fraud',
      icon: fraudDetectedIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    ActionStatuses.VERIFIED,
    {
      text: 'Verified',
      icon: successIcon,
      isSuccess: true,
      btnText: 'OK',
      type: 'hide',
    },
  ],
  [
    ActionStatuses.TIMEOUT_EXCEEDED,
    {
      text: `The operation is not finished. Please, try again.`,
      icon: errorIcon,
      isSuccess: false,
      btnText: 'Try again',
      type: 'hide',
    },
  ],
  [
    ActionStatuses.ENROLL_NOT_PASSED,
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
    ActionStatuses.ENROLL_PASSED,
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
