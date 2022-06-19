import React from 'react';

import SplashView from './SplashView';

const SplashContainer = props => {
  const goNext = async () => {
    props.navigation.navigate('MainBenefits', {
      animateTransparent: true,
    });
  };

  return <SplashView onAnimationFinish={goNext} {...props} />;
};

export default SplashContainer;
