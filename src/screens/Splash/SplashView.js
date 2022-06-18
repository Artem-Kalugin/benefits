import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashView = props => {
  const styles = getStyles();

  return (
    <LottieView
      autoPlay
      loop={false}
      onAnimationFinish={props.onAnimationFinish}
      source={require('../../snitchedData/assets/lottie/startingAnimation.json')}
      style={styles.container}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SplashView;
