import React, { ChangeEvent, FC, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Toggle from '../Toggler/Toggle';

import styles from './operationScreen.module.scss';
import { useCallInfoStore } from '../../../../stores/useCallInfo';
import { emitCommand } from '../../../../utils/helpers/emitCommand';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../../utils/helpers/connection';

export const OperationScreen: FC = () => {
  const navigate = useNavigate();

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);

  const [speakerName, setSpeakerName] = useState('');

  const onClickEnroll = () => {
    emitCommand(socket, 'start', 'enroll', clientId, callId);
    navigate('/enroll');
  };
  const onClickVerify = () => {
    emitCommand(socket, 'start', 'verify', clientId, callId);
    navigate('/verify');
  };

  //   const [isActiveAntiSpoof, setIsActiveAntiSpoof] = useState(false);
  //   const [isActiveGenFace, setIsActiveGenFace] = useState(false);
  //   const [isActiveAgeGender, setIsActiveAgeGender] = useState(false);

  //   const handleAntiSpoof = () => {
  //     setIsActiveAntiSpoof((prev) => !prev);
  //   };
  //   const handleGenFace = () => {
  //     setIsActiveGenFace((prev) => !prev);
  //   };
  //   const handleAgeGender = () => {
  //     setIsActiveAgeGender((prev) => !prev);
  //   };

  return (
    <div>
      <div style={{ width: 300 }}>
        <Input
          placeholder="Enter speaker name"
          value={speakerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            window.localStorage.setItem('speakerName', e.target.value);
            setSpeakerName(e.target.value);
          }}
        />
        <div className={styles.buttonWrapper}>
          <Button onClick={onClickEnroll} /*isDisabled={!speakerName.length}*/ titleBtn="Enroll" />
          <Button onClick={onClickVerify} /*isDisabled={!speakerName.length}*/ titleBtn="Verify" />
        </div>
      </div>
      <div className={styles.settings}>
        <div className={styles.wrapperSetting}>
          {/* <Toggle isOpened={isActiveAntiSpoof} onToggle={handleAntiSpoof} /> */}
          <div className={styles.titleToggle}>Anti-spoofing</div>
        </div>
        <div className={styles.wrapperSetting}>
          {/* <Toggle onToggle={handleGenFace} isOpened={isActiveGenFace} /> */}
          <div className={styles.titleToggle}>Generate Face</div>
        </div>
        <div className={styles.wrapperSetting}>
          {/* <Toggle onToggle={handleAgeGender} isOpened={isActiveAgeGender} /> */}
          <div className={styles.titleToggle}>Age Gender</div>
        </div>
      </div>
    </div>
  );
};
