import colors from '#styles';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './Text';

const categoriesParsed = require('../snitchedData/json/categories.json');

const categories = [
  { id: -1, order: -1, title: 'Все скидки' },
  ...categoriesParsed.data,
];

const CategoriesNavbar = ({ items = categories }) => {
  const flatListRef = useRef();
  const [activeItem, setActiveItem] = useState(-1);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const animateNavbar = id => {
    setActiveItem(id);
    flatListRef.current.scrollToIndex({
      index: items.findIndex(el => el.id === id),
      viewOffset: 16,
    });
  };

  useEffect(() => {
    console.log('rerender new heaer');
  }, []);

  return (
    <View
      key="BENEFITS_HEADER"
      style={[
        styles.navbar,
        {
          paddingTop: insets.top + 16,
        },
      ]}>
      <FlatList
        ref={flatListRef}
        data={items}
        initialScrollIndex={activeItem - 1}
        horizontal={true}
        onScrollToIndexFailed={e => {
          console.log('cannot scroll to index', e);
        }}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const isActive = item.id === activeItem;
          return (
            <View key={item.id} style={styles.navbarItemContainer}>
              <NavbarItem
                active={isActive}
                onPress={e => {
                  animateNavbar(item.id);
                  if (item.id === -1) {
                    navigation.navigate('MainBenefits', {
                      navbarItemId: -1,
                    });
                  } else {
                    if (item.id !== activeItem) {
                      navigation.replace('BenefitsCategory', {
                        navbarItemId: item.id,
                      });
                    }
                  }
                }}>
                {item.id === -1 && (
                  <FastImage
                    style={styles.popularIcon}
                    tintColor={isActive ? colors.white : colors.dark}
                    source={require('../snitchedData/assets/images/popular-filled.png')}
                  />
                )}
                <Text
                  color={isActive ? colors['white-90'] : colors['black-60']}>
                  {item.title}
                </Text>
              </NavbarItem>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navbarContainer}
      />
    </View>
  );
};

const NavbarItem = ({
  children = null,
  active = false,
  style = {},
  onPress = () => {},
}) => {
  const WrapperComponent = TouchableOpacity;

  return (
    <WrapperComponent
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        styles.navbarItem,
        {
          backgroundColor: active ? colors['primary-dark'] : colors['gray-40'],
        },
        style,
      ]}>
      {children}
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors['gray-40'],
    flexDirection: 'row',
  },
  navbarContainer: {
    paddingHorizontal: 16,
  },
  navbarItemContainer: {
    marginHorizontal: 4,
  },
  popularIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  navbarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
});

export default React.memo(CategoriesNavbar);
