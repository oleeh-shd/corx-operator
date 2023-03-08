import React, { FC } from 'react';
import pulseRight from '../../../../assets/sound_right.svg';
import pulseLeft from '../../../../assets/sound-left.svg';
import pulse from '../../../../assets/pulse.svg';
import voiceGray from '../../../../assets/voice_gray.svg';
import notVoiceGray from '../../../../assets/voice-not.svg';
import update from '../../../..//assets/update.svg';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../../../stores/useCallInfo';
import { useVadInfoStore } from '../../../../stores/useVadllInfo';
import { TaskType } from '../../../../utils/enum/taskType';
import { socket } from '../../../../utils/helpers/connection';
import { createdAt } from '../../../../utils/helpers/createdAt';
import { emitCommand, EmitCommandParams } from '../../../../utils/helpers/emitCommand';
import Button from '../Button/Button';

import styles from './CallerInfo.module.scss';

type CallerInfoProps = {
  animated?: boolean;
  isFinished: boolean;
};

const CallerInfo: FC<CallerInfoProps> = ({ animated, isFinished }) => {
  const navigate = useNavigate();

  const callerPhoneNumber = useCallInfoStore((state) => state.call_data.from);
  const clientName = useCallInfoStore((state) => state.call_data.client.name);
  const callerId = useCallInfoStore((state) => state.call_data.client.claim_id);
  const voiceSignature = useCallInfoStore((state) => state.call_data.client.dt_signature);
  const refreshVadTotalSeconds = useVadInfoStore((state) => state.refreshVadTotalSeconds);

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);

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

  return (
    <div className={styles.callerWrapper}>
      <div className={styles.callerInfo}>
        <div>
          <div className={styles.callerPhone}>{callerPhoneNumber}</div>
          <div className={styles.callerName}>{clientName}</div>
          <div className={styles.callerId}>{callerId}</div>
        </div>
        <div className={styles.timerWrapper}>
          {animated ? (
            <div className={styles.lineWrapper}>
              <img className={styles.lineTwo} src={pulseLeft} alt="part one" />
              <img className={styles.lineOne} src={pulseRight} alt="part two" />
            </div>
          ) : (
            <img src={pulse} alt="pulse" />
          )}
          {/*  //TODO Add total call time after back-end return them*/}
          {/*<div>{duration}</div>*/}
          {/* <p>{vadSeconds}</p> */}
        </div>
      </div>
      <div className={styles.callerUpdate}>
        <div className={styles.signatureWrapper}>
          <img src={voiceSignature ? voiceGray : notVoiceGray} alt="voice"></img>
          <div className={styles.signatureData}>
            {voiceSignature
              ? `Voice signature created on: ${createdAt(voiceSignature)}`
              : 'Voice signature not created'}
          </div>
        </div>
        {isFinished && (
          <Button
            styled={styles.styled}
            onClick={() => onClickEnroll()}
            titleBtn={
              <>
                <img src={update} alt="update"></img>
                <div>Update</div>
              </>
            }
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CallerInfo;
