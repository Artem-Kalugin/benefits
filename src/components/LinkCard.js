import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

import colors, { screenWidth } from '#styles';

const LinkCard = ({ amount = 58, width = screenWidth * 0.7 }) => {
  const styles = getStyles(width);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text color={colors['primary-30']} size={18}>
          Смотреть еще {amount}
        </Text>
      </View>
    </View>
  );
};

const getStyles = width =>
  StyleSheet.create({
    wrapper: {
      width: width,
      padding: 10,
    },
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: 1.7,
      borderRadius: 16,
      borderColor: colors['primary-30'],
      borderWidth: 2,
      backgroundColor: 'white',
    },
  });

export default LinkCard;
