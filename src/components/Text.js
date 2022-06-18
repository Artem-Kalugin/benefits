import React from 'react';
import { StyleSheet, Text as _Text } from 'react-native';
import colors from '#styles';

const Text = ({
  text = 'default Text',
  size = 14,
  lineHeight = size + 6,
  color = colors['black-60'],
  children = children,
}) => {
  const styles = getStyles(size, lineHeight, color);

  return <_Text style={styles.text}>{children}</_Text>;
};

const getStyles = (size, lineHeight, color) =>
  StyleSheet.create({
    text: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: size,
      lineHeight: lineHeight,
      color: color,
    },
  });

export default Text;
