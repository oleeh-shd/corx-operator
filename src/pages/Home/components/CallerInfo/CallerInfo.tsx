import React, { FC } from 'react';
import pulseRight from '../../../../assets/sound_right.svg';
import pulseLeft from '../../../../assets/sound-left.svg';
import pulse from '../../../../assets/pulse.svg';
import voiceGray from '../../../../assets/voice_gray.svg';
import notVoiceGray from '../../../../assets/voice-not.svg';
import update from '../../../..//assets/update.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import moment from 'moment';

import styles from './CallerInfo.module.scss';

type CallerInfoProps = {
  callerId: string;
  name: string;
  phone: string;
  created?: string;
  onClick: () => void;
  duration: string;
  animated?: boolean;
  verified?: string;
  isActiveCall?: boolean;
};

const CallerInfo: FC<CallerInfoProps> = ({
  callerId,
  name,
  phone,
  created,
  onClick,
  duration,
  animated,
  verified,
  isActiveCall,
}) => {
  const navigate = useNavigate();

  const redirect = () => {
    // resetVadSecondsApi();
    navigate(-1);
  };

  return (
    <div className={styles.callerWrapper}>
      <div className={styles.callerInfo}>
        <div>
          <div className={styles.callerPhone}>{phone}</div>
          <div className={styles.callerName}>{name}</div>
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
          <div>{duration}</div>
          {/* <p>{vadSeconds}</p> */}
        </div>
      </div>
      <div className={styles.callerUpdate}>
        <div className={styles.signatureWrapper}>
          <img src={verified ? voiceGray : notVoiceGray} alt="voice"></img>
          <div className={styles.signatureData}>
            {verified && created
              ? `Voice signature created on: ${moment(created)}`
              : 'Voice signature not created'}
          </div>
        </div>
        {verified && onClick && (
          <Button
            onClick={() => (isActiveCall ? onClick() : redirect())}
            titleBtn={
              <>
                <img src={update} alt="update"></img>
                <div>Update</div>
              </>
            }
            styled={styles.styled}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CallerInfo;
