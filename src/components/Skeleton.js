import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';

const USE_NATIVE_DRIVER_OPACITY = true;

const FADE_DURATION = 500;

const Skeleton = ({ visible = true, style = {} }) => {
  const styles = getStyles();

  const opacity = useRef(new Animated.Value(1));

  useEffect(() => {
    // animateLayout();
    if (visible) {
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: USE_NATIVE_DRIVER_OPACITY,
      }).start();
    } else {
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: USE_NATIVE_DRIVER_OPACITY,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacity.current,
        },
        style,
      ]}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      opacity: 1,
      backgroundColor: '#eee',
    },
  });

export default Skeleton;
