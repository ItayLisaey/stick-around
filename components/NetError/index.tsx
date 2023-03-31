import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';

export const NetError = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected;
      if (connected === null) return;
      setIsConnected(connected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const message = isConnected ? undefined : 'No internet connection';

  return (
    <ErrorMessage
      message={message}
      content={'Please check your internet connection and try again.'}
    />
  );
};
