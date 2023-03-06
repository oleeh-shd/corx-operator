import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';

import 'react-circular-progressbar/dist/styles.css';
import { Pixelify } from 'react-pixelify';
import loaderImage from '../../../../assets/loader.png';
import restart from '../../../../assets/restart.svg';
import unanimous from '../../../../assets/unanimous.jpg';
import warning from '../../../../assets/warning.svg';
import { useAgeInfoStore } from '../../../../stores/useAgeInfo';
import { useGenderInfoStore } from '../../../../stores/useGenderInfo';
import { useOperationInfoStore } from '../../../../stores/useOperationInfo';
import { useVoiceToFaceInfoStore } from '../../../../stores/useVoiceToFaceInfo';
import { TaskStatuses } from '../../../../utils/enum/taskStatuses';

import { period } from '../../../../utils/helpers/period';
import styles from './operationResultScreen.module.scss';

type ProgressBarProps = {
   result: string;
   onReset: () => void;
   pixelSize?: number;
}
const OperationResultScreen: FC<ProgressBarProps> = ({
       result,
       onReset,
       pixelSize = 10,

}) => {
  const age = useAgeInfoStore((state) => state.task_data.age);
  const gender = useGenderInfoStore((state) => state.task_data.gender);
  const image_url = useVoiceToFaceInfoStore((state) => state.task_data.image_url);

  const isActiveGenFace = useOperationInfoStore((state) => state.isActiveGenFace);
  const isActiveAgeGender = useOperationInfoStore((state) => state.isActiveAgeGender);

  const imgTaskStatus = useVoiceToFaceInfoStore((state) => state.task_status);


  const [pixelationSize, setPixelSize] = useState(pixelSize);

  useEffect(() => {
    if (image_url) {
      if (!pixelSize) return;

      const intervalId = setInterval(() => {
        setPixelSize(pixelationSize - 0.20);
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [pixelationSize, image_url]);

  return (
    <div className={styles.resultFaceWrapper}>
      <div className={styles.speechWrapper}>
        {result === 'fraud-detected' &&
					<div className={styles.speechContent}>
						<img src={warning} alt="warning"/>
						<div className={styles.speechTitle}>
							Synthetic speech detected
						</div>
					</div>
        }

        {(result === 'fraud-detected') && isActiveGenFace && <div className={styles.wr}></div>}
        {<div className={styles.imageWrapper} style={result !== 'fraud-detected' ? {
          flexDirection: 'row-reverse',
          alignItems: 'start',
          width: '100%',
          justifyContent: isActiveGenFace ? 'space-between' : 'start'
        } : {}}>
          {result !== '/' && isActiveGenFace &&
						<div className={styles.imageContainer}>
              {imgTaskStatus === TaskStatuses.FINISHED ? (!image_url ?
                  <img
                    style={{border: '1px solid #C0C0C0'}}
                    src={unanimous}
                    width={93}
                    height={93}
                    alt="unanimous"
                  /> :
                  <Pixelify
                    src={image_url}
                    width={93}
                    height={93}
                    centered={true}
                    pixelSize={pixelationSize}
                    fillTransparencyColor="white"
                  />) :
                <img
                  style={{marginRight: '9px'}}
                  className={styles.additionalLoader}
                  src={loaderImage}
                  alt=""
                />}
						</div>}
          {result !== '/' && isActiveAgeGender && (<div className="ageGender-wrapper">
            <div className={cn(styles.generatedAgeGenderText, styles.spacing)}>
              <div className={styles.contentTextWrapper}>
                <div className={styles.titleWrapper}>Age</div>
                <div
                  className={styles.titleContent}>{age ? (period(+age)) : '?'}</div>
              </div>
              <div className={styles.contentTextWrapper}>
                <div className={styles.titleWrapper}>Gender</div>
                <div
                  className={styles.titleContent}>{gender ? (gender === '[0]' ? 'male' : 'female') : '?'}</div>
              </div>
            </div>
          </div>)}
        </div>
        }
      </div>

      {(result === 'fraud-detected' || result === 'timeout-exceeded' || result === 'voice-not-verified' || result === 'enroll-not-passed') &&
				<div className={styles.actionWrapper}>
					<div
						className={styles.actionContainer}
						onClick={onReset}>
						<img src={restart} alt="restart"/>
						<div className={styles.restartTitle}>
							Restart verification
						</div>
					</div>
					<div className={styles.actionContainer}></div>
					<div className={styles.actionContainer}></div>
				</div>}
    </div>
  );
};

export default OperationResultScreen;
