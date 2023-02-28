import React, {FC, useState} from 'react';
import cn from 'classnames';

import styles from './callIdentify.module.scss';
import {statusesMap} from "../../../../utils/helpers/statuses";
import Button from "../Button/Button";

type ButtonProps = {
    result: string
}
const CallIdentify: FC<ButtonProps> = ({result}) => {
    const {text, icon, isSuccess, btnText, isEnroll, type} = statusesMap?.get(result) || {};
    const [speakerName, setSpeakerName] = useState('');

    return (
        <div
            className={cn(styles.resultWrapper, isEnroll && styles.isEnroll, isSuccess && styles.isSuccess)}>
            <img
                className={cn(styles.statusIcon,
                    styles.isSuccessIcon, result === 'voice-verified' || isEnroll && styles.isEnrollIcon
                )}
                src={icon}
                alt=""
            />
            <div className={styles.descriptionText}>Caller’s identity</div>
            <div className={cn(styles.statusText, isEnroll && styles.isEnrollText)}>{text}</div>
            {type !== 'hide' &&
							<div
								className={styles.homeScreenBtn}>
								<Button
									titleBtn={btnText as string}
									onClick={() => setSpeakerName('')}/>
							</div>
            }
        </div>
    );
};

export default CallIdentify;
