import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';

import Skeleton from './Skeleton';
import Text from './Text';

import colors, { screenWidth } from '#styles';

const BenefitCard = ({
  title = null,
  image = null,
  sale = null,
  width = screenWidth * 0.7,
  item = null,
  categoryId = -1,
  style = {},
}) => {
  const styles = getStyles(width);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={() => {
        navigation.navigate('Benefit', {
          ...item,
          animate: true,
          categoryId: categoryId,
        });
      }}
      style={[styles.container, style]}>
      <View style={Platform.OS === 'ios' ? styles.shadowView : {}}>
        <Skeleton visible={loading} style={styles.imageSkeleton} />

        <SharedElement id={`${categoryId}${item.gallery[0].id}`}>
          <FastImage
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
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
          <Text style={styles.benefitText} color={colors.dark} size={16}>
            {title}
          </Text>
        </SharedElement>
      ) : null}
    </TouchableOpacity>
  );
};

const getStyles = width =>
  StyleSheet.create({
    container: {
      width: width,
      padding: 10,
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
    benefitText: {
      marginTop: 8,
    },
    imageSkeleton: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
    },
    imageContainer: {
      borderRadius: 16,
      width: '100%',
      aspectRatio: 1.7,
    },
    shadowView: {
      borderRadius: 17,
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

export default React.memo(BenefitCard);
