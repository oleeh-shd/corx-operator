import React from 'react';
import { NotificationContainer } from 'react-notifications';

import useLogin from './useLogin';
import 'react-notifications/lib/notifications.css';

import styles from './login.module.scss';

import logo from '../../assets/new_logo.svg';
import Button from '../Home/components/Button/Button';
import Toggle from '../Home/components/Toggler/Toggle';
import Input from '../Home/components/Input/Input';

const Login = () => {
  const {
    handleToggle,
    onLogin,
    password,
    setPassword,
    setUsername,
    username,
    isStaySingIn,
    showPassword,
    setShowPassword,
    status,
    setStatus,
  } = useLogin();

  return (
    <>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logo}
          src={logo}
          alt="logo"
        />
        <h1 className={styles.logoTitle}>Cor-X</h1>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.loginText}>Login</div>
        <div className={styles.inputText}>User name</div>
        <Input
          error={status && status !== 'access'}
          access={status === 'access'}
          onChange={e => {
            setStatus('');
            setUsername(e.target.value)
          }}
          value={username}
          type="text"
          placeholder="email"
        />
        <div className={styles.inputText}>Password</div>
        <Input
          error={status && status !== 'access'}
          access={status === 'access'}
          showPassword={showPassword}
          value={password}
          type="password"
          onChange={e => {
            setStatus('');
            setPassword(e.target.value)
          }}
          onIconClick={() => setShowPassword(!showPassword)}
          placeholder="password"
        />

        <Button onClick={onLogin} titleBtn="Login" isDisabled={!!status?.length}></Button>
        <div className={styles.toggleWrapper}>
          <Toggle onToggle={handleToggle} isOpened={isStaySingIn}/>
          <div className={styles.textToggle}>Stay signed in</div>
        </div>
      </div>
      <NotificationContainer/>
    </>
  );
};

export default Login;
