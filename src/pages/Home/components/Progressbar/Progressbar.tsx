import React, { useEffect, useState, FC } from 'react';

import styles from './progressbar.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import loaderImage from '../../../../assets/loader.png';
import pulseEmpty from '../../../../assets/empty.svg';
import pulseFilled from '../../../../assets/filled.svg';
import faceSecond from '../../../../assets/face_2.svg';
import cn from 'classnames';

type ProgressBarProps = {
  timeInSeconds: number;
  counterTimeEnded: () => void;
  screenType: 'enroll' | 'verify';
  vadSeconds: number;
  onUpdate: (value: number) => void;
};
const Progressbar: FC<ProgressBarProps> = ({
  timeInSeconds,
  counterTimeEnded,
  screenType,
  onUpdate,
  vadSeconds,
}) => {
  const [number, setNumber] = useState(0);
  const [counterEnded, setCounterEnded] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const ADDITIONAL_WAITING_TIME = 10;

  const [width, setWidth] = useState(0);

  const getPulseWidth = (num: number) => 130 / num;

  useEffect(() => {
    if (number >= timeInSeconds) {
      setDisplayLoader(true);
      setTimeout(() => setCounterEnded(true), ADDITIONAL_WAITING_TIME);
      return;
    }

    const interval = setInterval(() => {
      onUpdate(number + 1);
      setNumber(number + 1);
      setWidth((prev) => prev + getPulseWidth(screenType === 'enroll' ? 20 : 10));
    }, 1000);

    return () => clearInterval(interval);
  }, [number]);

  useEffect(() => {
    if (counterEnded) {
      counterTimeEnded();
    }
  }, [counterEnded]);

  return (
    <>
      {screenType === 'enroll' ? (
        <p className={cn(styles.progressText, styles.modify)}>Creating voice signature.</p>
      ) : (
        ''
      )}

      {screenType === 'verify' ? (
        <p className={styles.progressText}>Verifying caller’s identity</p>
      ) : (
        ''
      )}

      <div className={styles.progressbarContainer}>
        {/*{displayLoader ? (*/}
        <div className={styles.progressbarWrapper}>
          {screenType !== 'enroll' ? (
            <img className={styles.additionalLoader} src={loaderImage} alt="" />
          ) : (
            <div className={styles.faceContainer}>
              <div className={styles.face}>
                <img src={faceSecond} alt="second-face" />
              </div>
            </div>
          )}

          <div className={styles.recordTime}>{`00:${number > 9 ? number : `0${number}`}`}</div>
          {/* <p>{timeConvert(vadSeconds)}</p>
                    <p>{moment(vadSeconds).format("mm:ms")}</p> */}

          <div className={styles.pulseContainer}>
            <div className={styles.pulseWrapper}>
              <img className={styles.empty} src={pulseEmpty} />
              <div className={styles.wrapperFilled} style={{ width: `${width}px` }}>
                <img className={styles.filled} src={pulseFilled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progressbar;
