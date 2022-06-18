import colors, { screenWidth } from '#styles';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const LinkCard = ({ amount = 58, size = 0.7 }) => {
  const styles = getStyles(size);

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

const getStyles = size =>
  StyleSheet.create({
    wrapper: {
      width: size * screenWidth,
      padding: 10,
    },
    container: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors['primary-30'],
      borderWidth: 2,
      backgroundColor: 'white',
    },
  });

export default LinkCard;
