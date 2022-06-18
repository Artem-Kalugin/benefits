import colors, { screenWidth } from '#styles';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import Text from './Text';

const BenefitCard = ({
  title = null,
  image = null,
  sale = null,
  size = 0.7,
  item = null,
  categoryId = -1,
}) => {
  const styles = getStyles(size);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Benefit', {
          ...item,
          animate: true,
          categoryId: categoryId,
        });
      }}
      style={styles.container}>
      <View style={styles.shadowView}>
        <SharedElement id={`${categoryId}${item.gallery[0].id}`}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imageContainer}
            source={{ uri: image }}
          />
        </SharedElement>
        <SharedElement id={`${categoryId}${item.id}_SALE_BADGE`}>
          <View style={styles.salesWrapper}>
            <Text color="white">{sale}</Text>
          </View>
        </SharedElement>
      </View>
      {title ? (
        <SharedElement id={`${categoryId}${item.id}_TITLE`}>
          <Text color={colors.dark} size={16}>
            {title}
          </Text>
        </SharedElement>
      ) : null}
    </TouchableOpacity>
  );
};

const getStyles = size =>
  StyleSheet.create({
    container: {
      padding: 10,
      width: size * screenWidth,
    },
    salesWrapper: {
      alignSelf: 'flex-start',
      position: 'absolute',
      left: 10,
      bottom: 18,
      padding: 6,
      borderRadius: 20,
      backgroundColor: colors.secondary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.22,
      elevation: 3,
    },
    imageContainer: {
      marginBottom: 8,
      borderRadius: 16,
      width: '100%',
      aspectRatio: 1.7,
    },
    shadowView: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  });

export default BenefitCard;
