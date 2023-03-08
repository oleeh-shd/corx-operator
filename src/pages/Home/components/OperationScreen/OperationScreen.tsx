import React, { ChangeEvent, FC, useState } from 'react';
import { OperationInfo, useOperationInfoStore } from '../../../../stores/useOperationInfo';
import { TaskType } from '../../../../utils/enum/taskType';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Toggle from '../Toggler/Toggle';

import styles from './operationScreen.module.scss';
import { useCallInfoStore } from '../../../../stores/useCallInfo';
import { emitCommand, EmitCommandParams } from '../../../../utils/helpers/emitCommand';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../../utils/helpers/connection';
import { useVadInfoStore } from '../../../../stores/useVadllInfo';

export const OperationScreen: FC = () => {
  const navigate = useNavigate();

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);
  const hasSignature = useCallInfoStore((state) => state.call_data.client.dt_signature);
  const isActiveAgeGender = useOperationInfoStore((state) => state.isActiveAgeGender);
  const isActiveAntiSpoof = useOperationInfoStore((state) => state.isActiveAntiSpoof);
  const isActiveGenFace = useOperationInfoStore((state) => state.isActiveGenFace);
  const updateOperationInfo = useOperationInfoStore((state) => state.updateOperationInfo);
  const refreshVadTotalSeconds = useVadInfoStore((state) => state.refreshVadTotalSeconds);

  const [speakerName, setSpeakerName] = useState('');

  const onClickEnroll = () => {
    const params: EmitCommandParams = {
      socket,
      task_type: TaskType.ENROLL,
      call_id: callId,
      client_id: clientId,
    };

    refreshVadTotalSeconds();
    emitCommand(params);
    navigate('/enroll');
  };
  const onClickVerify = () => {
    const params: EmitCommandParams = {
      socket,
      task_type: TaskType.VERIFY,
      call_id: callId,
      client_id: clientId,
    };

    refreshVadTotalSeconds();
    emitCommand(params);

    isActiveAntiSpoof && emitCommand({ socket, task_type: TaskType.ANTI_SPOOF, call_id: callId });
    isActiveAgeGender && emitCommand({ socket, task_type: TaskType.AGE, call_id: callId });
    isActiveAgeGender && emitCommand({ socket, task_type: TaskType.GENDER, call_id: callId });
    isActiveGenFace && emitCommand({ socket, task_type: TaskType.VOICE_TO_FACE, call_id: callId });

    navigate('/verify');
  };

  const handleUpdate = (updateValue: Partial<OperationInfo>) => {
    updateOperationInfo(updateValue);
  };

  return (
    <div>
      <div className={styles.operationWrapper}>
        <Input
          placeholder="Enter speaker name"
          value={speakerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            window.localStorage.setItem('speakerName', e.target.value);
            setSpeakerName(e.target.value);
          }}
        />
        <div className={styles.buttonWrapper}>
          <Button onClick={onClickEnroll} isDisabled={!speakerName.length} titleBtn="Enroll" />
          <Button onClick={onClickVerify} isDisabled={!hasSignature} titleBtn="Verify" />
        </div>
      </div>
      <div className={styles.settings}>
        <div className={styles.wrapperSetting}>
          <Toggle
            isOpened={isActiveAntiSpoof}
            onToggle={() => handleUpdate({ isActiveAntiSpoof: !isActiveAntiSpoof })}
          />
          <div className={styles.titleToggle}>Anti-spoofing</div>
        </div>
        <div className={styles.wrapperSetting}>
          <Toggle
            onToggle={() => handleUpdate({ isActiveGenFace: !isActiveGenFace })}
            isOpened={isActiveGenFace}
          />
          <div className={styles.titleToggle}>Generate Face</div>
        </div>
        <div className={styles.wrapperSetting}>
          <Toggle
            onToggle={() => handleUpdate({ isActiveAgeGender: !isActiveAgeGender })}
            isOpened={isActiveAgeGender}
          />
          <div className={styles.titleToggle}>Age Gender</div>
        </div>
      </div>
    </div>
  );
};
