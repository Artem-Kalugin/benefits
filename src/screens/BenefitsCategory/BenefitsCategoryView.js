import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { SharedElement } from 'react-navigation-shared-element';

import BenefitCard from '#components/BenefitCard';
import Text from '#components/Text';

import { BENEFITS_IN_LIST_WIDTH } from '#config';

import colors, { screenHeight } from '#styles';

const WrapperComponent = Platform.OS === 'android' ? Ripple : TouchableOpacity;

const BenefitsCategoryView = props => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentStyle}
        ListHeaderComponent={
          <Text style={styles.title} size={30} color={colors.dark}>
            {props.title}
          </Text>
        }
        maxToRenderPerBatch={2}
        initialNumToRender={4}
        ref={props.flatListRef}
        data={props.items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BenefitCard
            style={styles.cardStyle}
            width={BENEFITS_IN_LIST_WIDTH}
            categoryId={props.categoryId}
            item={item}
            title={item.title}
            image={item.gallery[0].path}
            sale={item.sale}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <WrapperComponent
              activeOpacity={0.6}
              style={[styles.button, styles.buttonFilled]}>
              <Text color={'white'}>Здесь нет того, что я хочу</Text>
            </WrapperComponent>

            <WrapperComponent
              activeOpacity={0.6}
              onPress={props.scrollToTop}
              style={styles.button}>
              <Text>Вернутся наверх</Text>
            </WrapperComponent>
          </View>
        }
      />

      <SharedElement style={styles.underScreenContainer} id="PHONE_OVERLAY">
        <View style={styles.phoneOverlay} />
      </SharedElement>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    title: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderColor: colors['gray-40'],
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: colors.neutral,
      borderRadius: 16,
    },
    buttonFilled: {
      backgroundColor: colors.primary,
      borderWidth: 0,
    },
    cardStyle: {
      paddingHorizontal: 20,
    },
    underScreenContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: screenHeight,
    },
    phoneOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderWidth: 1,
      borderColor: colors['gray-40'],
    },
  });

export default BenefitsCategoryView;
