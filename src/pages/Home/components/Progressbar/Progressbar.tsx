import React, { useEffect, useState, FC } from 'react';
import { useVadInfoStore } from '../../../../stores/useVadllInfo';
import { TaskType } from '../../../../utils/enum/taskType';
import { timeConvert } from '../../../../utils/helpers/timeConvertor';

import styles from './progressbar.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import loaderImage from '../../../../assets/loader.png';
import pulseEmpty from '../../../../assets/empty.svg';
import pulseFilled from '../../../../assets/filled.svg';
import faceSecond from '../../../../assets/face_2.svg';
import cn from 'classnames';

type ProgressBarProps = {
  screenType: TaskType;
};

const Progressbar: FC<ProgressBarProps> = ({ screenType }) => {
  const [width, setWidth] = useState(0);
  const required_seconds = useVadInfoStore((state) => state.task_data.required_seconds);
  const total_seconds = useVadInfoStore((state) => state.task_data.total_seconds);

  const getPulseWidth = (num: number) => 130 / num;

  useEffect(() => {
    if (required_seconds) {
      setWidth((prev) => prev + getPulseWidth(required_seconds));
    }
  }, [total_seconds]);

  return (
    <>
      {screenType === TaskType.ENROLL ? (
        <p className={cn(styles.progressText, styles.modify)}>Creating voice signature.</p>
      ) : (
        ''
      )}

      {screenType === TaskType.VERIFY ? (
        <p className={styles.progressText}>Verifying caller’s identity</p>
      ) : (
        ''
      )}

      <div className={styles.progressbarContainer}>
        {/*{displayLoader ? (*/}
        <div className={styles.progressbarWrapper}>
          {screenType !== TaskType.ENROLL ? (
            <img className={styles.additionalLoader} src={loaderImage} alt="" />
          ) : (
            <div className={styles.faceContainer}>
              <div className={styles.face}>
                <img src={faceSecond} alt="second-face" />
              </div>
            </div>
          )}
          <p className={styles.seconds}>{timeConvert(total_seconds)}</p>
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
