import colors, { screenHeight } from '#styles';
import AnimatedBenefitsSection from 'components/AnimatedBenefitsSection';
import CategoriesNavbar from 'components/CategoriesNavbar';
import LinkCard from 'components/LinkCard';
import Text from 'components/Text';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const benefits = require('../../snitchedData/json/benefits.json');

const benefitsByCategory = require('../../snitchedData/json/benifitsByCategory.json');

const MainBenefitsView = props => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitle}>
          <Text color={colors.dark} size={20}>
            Новинки
          </Text>
        </View>
        <AnimatedBenefitsSection
          isCollapsed={true}
          categoryId={-1}
          data={benefits.data.slice(0, 20)}
        />
        {benefitsByCategory.data.map(el => {
          return (
            <View key={el.id}>
              <View style={styles.sectionTitle}>
                <Text color={colors.dark} size={20}>
                  {el.title}
                </Text>
              </View>
              <AnimatedBenefitsSection
                categoryId={el.id}
                ListFooterComponent={
                  <LinkCard
                    size={0.65}
                    amount={el.benefits_count - el.benefits.length}
                  />
                }
                itemSize={0.65}
                data={el.benefits}
              />
            </View>
          );
        })}
      </ScrollView>

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
    sectionTitle: {
      paddingHorizontal: 20,
      marginTop: 12,
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
