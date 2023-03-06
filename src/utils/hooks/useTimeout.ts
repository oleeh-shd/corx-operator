import { useEffect, useState } from 'react';

export const useTimeout = (ms: number) => {
  const [isTimeExceeded, setIsTimeExceeded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTimeExceeded(true);
    }, ms);
  }, []);

  return isTimeExceeded;
};
