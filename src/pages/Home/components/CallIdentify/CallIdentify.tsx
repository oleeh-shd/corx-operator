import React, { FC } from 'react';
import cn from 'classnames';

import styles from './callIdentify.module.scss';
import { statusesMap } from '../../../../utils/helpers/statuses';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { emitCommand, EmitCommandParams } from '../../../../utils/helpers/emitCommand';
import { socket } from '../../../../utils/helpers/connection';
import { TaskType } from '../../../../utils/enum/taskType';
import { useCallInfoStore } from '../../../../stores/useCallInfo';
import { ActionStatuses } from '../../../../utils/enum/actionStatuses';
import { useVadInfoStore } from '../../../../stores/useVadllInfo';

type ButtonProps = {
  result: ActionStatuses;
};

const CallIdentify: FC<ButtonProps> = ({ result }) => {
  const navigate = useNavigate();
  const { text, icon, isSuccess, btnText, isEnroll, type } = statusesMap?.get(result) || {};

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);
  const refreshVadTotalSeconds = useVadInfoStore((state) => state.refreshVadTotalSeconds);

  const handleEnrollResult = () => {
    if (isSuccess) {
      navigate('/');
      return;
    }

    const params: EmitCommandParams = {
      socket,
      task_type: TaskType.ENROLL,
      call_id: callId,
      client_id: clientId,
    };

    refreshVadTotalSeconds();
    emitCommand(params);
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
          result === ActionStatuses.VERIFIED && styles.isSuccessIcon,
          result === ActionStatuses.VERIFIED || (isEnroll && styles.isEnrollIcon)
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
