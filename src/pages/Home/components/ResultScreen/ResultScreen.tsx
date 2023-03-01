import React, { FC } from 'react';
import { Pixelify } from 'react-pixelify';

import 'react-circular-progressbar/dist/styles.css';
import loaderImage from '../../../../assets/loader.png';
import cn from 'classnames';
import styles from './resultScreen.module.scss';
import warning from '../../../../assets/warning.svg';
import restart from '../../../../assets/restart.svg';
import unanimous from '../../../../assets/unanimous.jpg';

import { period } from '../../../../utils/helpers/period';

type ProgressBarProps = {
  result: string;
  isActiveGenFace: boolean
  genFace?: {
    img: string;
    default: boolean;
  },
  ageGander?: {
    age: string;
    gender: string;
  },
  pixelSize: number;
  isActiveAgeGender: boolean;

}
const ResultScreen: FC<ProgressBarProps> = ({
      isActiveGenFace,
      result,
      genFace,
      isActiveAgeGender,
      pixelSize,
      ageGander = {img: unanimous, default: false}

                                            }) => {

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
              {genFace ? (genFace.default ?
                  <img
                    style={{border: '1px solid #C0C0C0'}}
                    src={unanimous}
                    width={93}
                    height={93}
                  /> :
                  <Pixelify
                    src={genFace.img}
                    width={93}
                    height={93}
                    centered={true}
                    pixelSize={pixelSize}
                    fillTransparencyColor="white"
                  />) :
                <img
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
                  className={styles.titleContent}>{ageGander?.age ? (period(+ageGander?.age?.substr(2, 2))) : '?'}</div>
              </div>
              <div className={styles.contentTextWrapper}>
                <div className={styles.titleWrapper}>Gender</div>
                <div
                  className={styles.titleContent}>{ageGander?.gender ? (ageGander.gender === '[0]' ? 'male' : 'female') : '?'}</div>
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
						onClick={(value) => {
              console.log('Reset:', value)
            }}>
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

export default ResultScreen;
