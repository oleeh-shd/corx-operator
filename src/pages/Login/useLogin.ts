import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import loginApi from '../../services/loginApi';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string>('');

  const [isStaySingIn, setIsStaySingIn] = useState(true);

  const isAuth = localStorage.getItem('token') || sessionStorage.getItem('token');

  const navigate = useNavigate();

  const saveToken = useCallback((token: string) => {
    if (isStaySingIn) return localStorage.setItem('token', token);

    return sessionStorage.setItem('token', token);
  }, []);

  const handleToggle = useCallback(() => {
    setIsStaySingIn((isStaySingIn) => !isStaySingIn);
  }, []);

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const onLogin = async () => {
    try {
      setStatus(validateEmail(username) ? 'access' : '');
      const response = await loginApi.login(username, password);
      const { access_token } = response;
      saveToken(access_token);
      navigate('/');
    } catch (error) {
      setStatus(error as string);
      NotificationManager.error(`Error message:  ${error}`);
    }
  };

  return {
    onLogin,
    handleToggle,
    isAuth,
    setUsername,
    setPassword,
    username,
    password,
    isStaySingIn,
    showPassword,
    setShowPassword,
    status,
    setStatus,
  };
};

export default useLogin;
