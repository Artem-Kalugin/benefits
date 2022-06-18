import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import RootStack from './navigation';

const AppMiddleware = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  return <RootStack />;
};

export default AppMiddleware;
