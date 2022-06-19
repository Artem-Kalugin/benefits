import React from 'react';
import { useSelector } from 'react-redux';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import screens from '#screens';

const MainStackNav = createSharedElementStackNavigator();

const RootStack = () => {
  const headerHeight = useSelector(store => store.navbar.headerHeight);

  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        gestureEnabled: false,
      }}
      initialRouteName="Splash">
      <MainStackNav.Screen name="Splash" component={screens.Splash} />

      <MainStackNav.Screen
        name="MainBenefits"
        options={({ route: { params } }) => {
          return {
            animationTypeForReplace: params?.animationTypeForReplace,
            cardStyleInterpolator: params?.animateTransparent
              ? ({ current: { progress } }) => {
                  return {
                    cardStyle: {
                      opacity: progress,
                    },
                  };
                }
              : undefined,
          };
        }}
        component={screens.MainBenefits}
      />

      <MainStackNav.Screen
        name="BenefitsCategory"
        options={({ route: { params } }) => {
          return {
            animationTypeForReplace: params.animationTypeForReplace,
          };
        }}
        component={screens.BenefitsCategory}
      />

      <MainStackNav.Screen
        name="Benefit"
        options={{
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
        sharedElements={route => {
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
