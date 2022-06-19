import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

import AnimatedBenefitsSection from '#components/AnimatedBenefitsSection';
import LinkCard from '#components/LinkCard';
import Text from '#components/Text';

import { NEW_BENEFITS_WIDTH, SECTIONED_BENEFITS_WIDTH } from '#config';

import colors, { screenHeight } from '#styles';

const benefitsByCategory = require('../../snitchedData/json/benifitsByCategory.json');
const flatListData = [{}, ...benefitsByCategory.data];

const MainBenefitsView = props => {
  const styles = getStyles(props.headerHeight);

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          <View style={styles.sectionTitle}>
            <Text color={colors.dark} size={20}>
              Новинки
            </Text>
          </View>

          <AnimatedBenefitsSection
            isCollapsed={true}
            categoryId={-1}
            itemWidth={NEW_BENEFITS_WIDTH}
            data={benefitsByCategory.novelty}
          />
        </View>
      );
    } else {
      return (
        <View key={item.id}>
          <View style={styles.sectionTitle}>
            <Text color={colors.dark} size={20}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => props.goToCategory(item)}>
              <Text color={colors.primary} size={16}>
                Все
              </Text>
            </TouchableOpacity>
          </View>

          <AnimatedBenefitsSection
            categoryId={item.id}
            ListFooterComponent={() => {
              return item.benefits_count - item.benefits.length > 0 ? (
                <TouchableOpacity onPress={() => props.goToCategory(item)}>
                  <LinkCard
                    width={SECTIONED_BENEFITS_WIDTH}
                    amount={item.benefits_count - item.benefits.length}
                  />
                </TouchableOpacity>
              ) : null;
            }}
            itemWidth={SECTIONED_BENEFITS_WIDTH}
            data={item.benefits}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={50}
        initialNumToRender={Platform.OS === 'ios' ? 5 : 3}
        data={flatListData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />

      <SharedElement style={styles.underScreenContainer} id="PHONE_OVERLAY">
        <View style={styles.phoneOverlay} />
      </SharedElement>
    </View>
  );
};

const getStyles = headerHeight =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    listContainer: {
      paddingTop: headerHeight,
      paddingBottom: 16,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    underScreenContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
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

export default MainBenefitsView;
