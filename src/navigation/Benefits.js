import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import screens from '#screens';
import { Platform } from 'react-native';
import CategoriesNavbar from 'components/CategoriesNavbar';

const BenefitsStackNav = createSharedElementStackNavigator();

const fadeTransitionAnimationOptions = {
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const BenefitsStack = () => {
  return (
    <BenefitsStackNav.Navigator
      screenOptions={{
        headerMode: 'float',
        header: () => <CategoriesNavbar />,
      }}
      initialRouteName="MainBenefits">
      <BenefitsStackNav.Screen
        name="MainBenefits"
        // options={fadeTransitionAnimationOptions}
        sharedElements={(route, otherRoute, showing) => {
          if (route.params.sharedAnimate && Platform.OS === 'ios') {
            return [...route.params.sharedItems];
          }
        }}
        component={screens.MainBenefits}
      />
      <BenefitsStackNav.Screen
        name="BenefitsCategory"
        // options={fadeTransitionAnimationOptions}
        // sharedElements={(route, otherRoute, showing) => {
        //   if (route.params.sharedAnimate && Platform.OS === 'ios') {
        //     return [...route.params.sharedItems];
        //   }
        // }}
        component={screens.BenefitsCategory}
      />
    </BenefitsStackNav.Navigator>
  );
};

export default BenefitsStack;
