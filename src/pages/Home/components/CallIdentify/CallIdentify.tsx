import React, { FC } from 'react';
import cn from 'classnames';

import styles from './callIdentify.module.scss';
import { statusesMap } from '../../../../utils/helpers/statuses';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { emitCommand } from '../../../../utils/helpers/emitCommand';
import { socket } from '../../../../utils/helpers/connection';
import { TaskType } from '../../../../utils/enum/taskType';
import { useCallInfoStore } from '../../../../stores/useCallInfo';

type ButtonProps = {
  result: string;
};

const CallIdentify: FC<ButtonProps> = ({ result }) => {
  const navigate = useNavigate();
  const { text, icon, isSuccess, btnText, isEnroll, type } = statusesMap?.get(result) || {};

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);

  const handleEnrollResult = () => {
    if (isSuccess) {
      navigate('/');
      return;
    }
    emitCommand(socket, 'start', TaskType.ENROLL, clientId, callId);
  };

  return (
    <div
      className={cn(
        styles.resultWrapper,
        isEnroll && styles.isEnroll,
        isSuccess && styles.isSuccess
      )}
    >
      <img
        className={cn(
          styles.statusIcon,
          result === 'voice-verified' && styles.isSuccessIcon,
          result === 'voice-verified' || (isEnroll && styles.isEnrollIcon)
        )}
        src={icon}
        alt=""
      />
      <div className={styles.descriptionText}>Caller’s identity</div>
      <div className={cn(styles.statusText, isEnroll && styles.isEnrollText)}>{text}</div>
      {type !== 'hide' && (
        <div className={styles.homeScreenBtn}>
          <Button titleBtn={btnText as string} onClick={handleEnrollResult} />
        </div>
      )}
    </div>
  );
};

export default CallIdentify;
