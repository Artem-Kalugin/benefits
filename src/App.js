import React, { useRef } from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';

import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppMiddleware from './AppMiddleware';

import store from '#store';
import { changeRoute } from '#store/navbar/navbarSlice';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          theme={MyTheme}
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              store.dispatch(changeRoute(currentRouteName));
            }

            routeNameRef.current = currentRouteName;
          }}>
          <AppMiddleware navigationRef={navigationRef} />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
