import colors, { screenWidth } from '#styles';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

const BenefitView = props => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets.top);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['#00000044', '#00000000']}
        pointerEvents="none"
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Benefits', {
            sharedAnimate: true,
            animate: true,
            sharedItems: [
              '' + props.categoryId + props.gallery[0].id,
              'PHONE_OVERLAY',
            ],
          });
        }}
        style={styles.goBackButton}>
        <FastImage
          style={styles.goBackIcon}
          source={require('../../snitchedData/assets/images/chevron-back.png')}
        />
      </TouchableOpacity>
      <SharedElement id={'' + props.categoryId + props.gallery[0].id}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
          source={{ uri: props.gallery[0].path }}
        />
      </SharedElement>
      <SharedElement style={styles.phoneOverlayContainer} id={'PHONE_OVERLAY'}>
        <View style={styles.phoneOverlay} />
      </SharedElement>
    </View>
  );
};

const getStyles = insetsTop =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      width: '100%',
      height: 100,
      paddingTop: insetsTop,
      position: 'absolute',
      zIndex: 2,
    },
    image: {
      // borderRadius: 16,
      width: screenWidth,
      aspectRatio: 1.7,
    },
    goBackButton: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: insetsTop + 16,
      left: 16,
      zIndex: 5,
      backgroundColor: 'white',
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    goBackIcon: {
      width: '100%',
      height: '100%',
    },
    phoneOverlay: {
      width: '100%',
      height: '100%',
      marginTop: -32,
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderWidth: 1,
      borderColor: colors['gray-40'],
    },
  });

export default BenefitView;
