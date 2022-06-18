import { requestDummy } from '#utils';
import React, { useEffect, useRef, useState } from 'react';
import SplashView from './SplashView';

const SplashContainer = props => {
  const goNext = async () => {
    props.navigation.navigate('Benefits');
  };

  return <SplashView onAnimationFinish={goNext} {...props} />;
};

export default SplashContainer;
