import React, { FC, useState, useRef } from 'react';

import menu from '../../assets/menu.svg';
import { useOnClickOutside } from '../../utils/hooks/useClickOutside';
import styles from './layout.module.scss';

const isAuth = true;

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.container}>
      <header>
        <div className={`${styles.contentWrapper} ${styles.headerContent}`}>
          <div className={styles.infoWrapper}>
            <span className={styles.infoContent}></span>
          </div>
          {isAuth && (
            <div onClick={() => setIsOpen(!isOpen)} className={styles.menuWrapper}>
              <img className={styles.menu} src={menu} alt="menu" />
              {isOpen && (
                <div ref={dropdownRef} /*onClick={logOut}*/ className={styles.btnLog}>
                  {'Logout'}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <section className={styles.main}>
        <div className={`${styles.contentWrapper} ${styles.mainContent}`}>{children}</div>
      </section>
      <div className={styles.footer} />
    </div>
  );
};
