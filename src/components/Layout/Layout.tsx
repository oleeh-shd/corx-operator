import React, { FC, useState, useRef } from 'react';

import menu from '../../assets/menu.svg';
import { useOnClickOutside } from '../../utils/hooks/useClickOutside';
import styles from './layout.module.scss';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const logOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const isAuth =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  return (
    <div className={styles.container}>
      <header>
        <div className={`${styles.contentWrapper} ${styles.headerContent}`}>
          <div className={styles.infoWrapper}>
            <span className={styles.infoContent}></span>
          </div>
          {isAuth && (
            <div ref={dropdownRef} onClick={() => setIsOpen(!isOpen)} className={styles.menuWrapper}>
              <img className={styles.menu} src={menu} alt="menu"/>
              {isOpen && (
                <div onClick={logOut} className={styles.btnLog}>
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <section className={styles.main}>
        <div className={`${styles.contentWrapper} ${styles.mainContent}`}>{children}</div>
      </section>
      <div className={styles.footer}/>
    </div>
  );
};
