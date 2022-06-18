import React from 'react';
import AppMiddleware from './AppMiddleware';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppMiddleware />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
