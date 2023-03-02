import React, { FC, useEffect, useState } from 'react';
import phone from '../../../../assets/phone-in.svg';
import waves from '../../../../assets/waves.svg';

import styles from './OngoingScreen.module.scss';

type OngoingScreenProps = {
  phoneNumber: string;
};
export const OngoingScreen: FC<OngoingScreenProps> = ({ phoneNumber }) => {
  const [width, setWidth] = useState(window.innerWidth | 0);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    <div className={styles.callWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.colorRoundFirst}></div>
        <div className={styles.colorRoundSecond}></div>
        <div className={styles.colorRoundThird}></div>
        <div className={styles.blackRound}></div>
        <img className={styles.phone} src={phone} alt="logo" />
      </div>
      <div className={styles.callTitle}>Ongoing call from</div>
      <div className={styles.phoneTittle}>{phoneNumber}</div>
      {width < 520 && <img alt="waves" className={styles.wavesWrapper} src={waves} />}
    </div>
  );
};
