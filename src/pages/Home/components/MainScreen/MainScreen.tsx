import React, { FC } from 'react';

import logoBlack from '../../../../assets/logo_black.svg';
import styles from './mainScreen.module.scss';

export const MainScreen: FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainInfo}>
        <span className={styles.titleUser}>Hello</span>
        <div className={styles.title}>{`Ready for next call`}</div>
      </div>
      <img className={styles.logo} src={logoBlack} alt="logo" />
    </div>
  );
};
