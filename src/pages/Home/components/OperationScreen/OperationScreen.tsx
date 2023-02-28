import React, {ChangeEvent, FC, useState} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Toggle from "../Toggler/Toggle";

import styles from './operationScreen.module.scss'

export const OperationScreen: FC = () => {

    const [speakerName, setSpeakerName] = useState('');
    const [enroll, setEnroll] = useState(false);
    const lastCallerId = 1111;
    const isActiveCall = false;

    const [isActiveAntiSpoof, setIsActiveAntiSpoof] = useState(false);
    const [isActiveGenFace, setIsActiveGenFace] = useState(false);
    const [isActiveAgeGender, setIsActiveAgeGender] = useState(false);

    const onClickEnroll = () => {
        console.log('')
    };
    const onClickVerifyVoicePrint = () => {
        console.log('')
    };
    const handleAntiSpoof = () => {
        setIsActiveAntiSpoof((prev) => !prev)
    };
    const handleGenFace = () => {
        setIsActiveGenFace((prev) => !prev)
    };
    const handleAgeGender = () => {
        setIsActiveAgeGender((prev) => !prev)
    };

    return (
        <div>
            <div style={{width: 300}}>
                <Input
                    placeholder='Enter speaker name'
                    value={speakerName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        window.localStorage.setItem('speakerName', e.target.value);
                        setSpeakerName(e.target.value);
                    }}
                />
                <div className={styles.buttonWrapper}>
                    <Button
                        onClick={onClickEnroll}
                        isDisabled={!speakerName.length || !isActiveCall}
                        titleBtn='Enroll'
                    />
                    <Button
                        onClick={() => {
                            setEnroll(true);
                            onClickVerifyVoicePrint()
                        }}
                        isDisabled={!lastCallerId}
                        titleBtn='Verify'
                    />
                </div>
            </div>
            <div className={styles.settings}>
                <div className={styles.wrapperSetting}>
                    <Toggle
                        isOpened={isActiveAntiSpoof}
                        onToggle={handleAntiSpoof}
                    />
                    <div className={styles.titleToggle}>Anti-spoofing</div>
                </div>
                <div className={styles.wrapperSetting}>
                    <Toggle
                        onToggle={handleGenFace}
                        isOpened={isActiveGenFace}
                    />
                    <div className={styles.titleToggle}>Generate Face</div>
                </div>
                <div className={styles.wrapperSetting}>
                    <Toggle
                        onToggle={handleAgeGender}
                        isOpened={isActiveAgeGender}
                    />
                    <div className={styles.titleToggle}>Age Gender</div>
                </div>
            </div>
        </div>
    );
};
