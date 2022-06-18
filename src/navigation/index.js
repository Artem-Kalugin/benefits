import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import screens from '#screens';
import { Platform } from 'react-native';
import BenefitsStack from './Benefits';

const MainStackNav = createSharedElementStackNavigator();

const fadeTransitionAnimationOptions = {
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const RootStack = () => {
  return (
    <MainStackNav.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash">
      <MainStackNav.Screen name="Splash" component={screens.Splash} />
      <MainStackNav.Screen name="Benefits" component={BenefitsStack} />
      <MainStackNav.Screen
        name="Benefit"
        options={{
          gestureEnabled: false,
          backgroundColor: 'transparent',
          detachPreviousScreen: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
        sharedElements={(route, otherRoute, showing) => {
          return [
            `${route.params.categoryId}${route.params.gallery[0].id}`,
            'PHONE_OVERLAY',
          ];
        }}
        component={screens.Benefit}
      />
    </MainStackNav.Navigator>
  );
};

export default RootStack;
