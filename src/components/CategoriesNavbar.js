import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackActions } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from './Text';

import colors from '#styles';

import { changeHeaderHeight } from '#store/navbar/navbarSlice';

const categoriesParsed = require('../snitchedData/json/categories.json');

const categories = [
  { id: -1, order: -1, title: 'Все скидки' },
  ...categoriesParsed.data,
];

const CategoriesNavbar = React.forwardRef(
  ({ items = categories, navigationRef = null }, ref) => {
    const insets = useSafeAreaInsets();

    const flatListRef = useRef();
    const opacity = useRef(new Animated.Value(0)).current;

    const [activeItem, setActiveItem] = useState(-1);
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItemRef = useRef(-1);

    const dispatch = useDispatch();
    const navbarState = useSelector(store => store.navbar);

    const animateNavbar = id => {
      const _activeIndex = items.findIndex(el => el.id === id);

      if (_activeIndex === -1) {
        return;
      }

      setActiveItem(id);
      setActiveIndex(_activeIndex);

      activeItemRef.current = id;

      flatListRef.current.scrollToIndex({
        index: _activeIndex,
        viewPosition: 0.5,
      });
    };

    const onPressNavbarItem = (item, index) => {
      animateNavbar(item.id);
      if (item.id !== activeItem) {
        if (item.id === -1) {
          navigationRef.current.dispatch(
            StackActions.replace('MainBenefits', {
              navbarItemId: -1,
              animationTypeForReplace: 'pop',
            }),
          );
        } else {
          navigationRef.current.dispatch(
            StackActions.replace('BenefitsCategory', {
              navbarItemId: item.id,
              category: item,
              animationTypeForReplace: index < activeIndex ? 'pop' : 'push',
            }),
          );
        }
      }
    };

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: navbarState.isVisible ? 1 : 0,
        duration: navbarState.isVisible ? 500 : 200,
        useNativeDriver: true,
      }).start();
    }, [navbarState.isVisible, opacity]);

    useEffect(() => {
      if (ref) {
        ref.current = {
          animateNavbar,
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Animated.View
        pointerEvents={navbarState.isVisible ? 'auto' : 'none'}
        onLayout={e => {
          dispatch(changeHeaderHeight(e.nativeEvent.layout.height));
        }}
        key="BENEFITS_HEADER"
        style={[
          styles.navbar,
          {
            paddingTop: insets.top + 16,
            opacity: opacity,
          },
        ]}>
        <FlatList
          ref={flatListRef}
          data={items}
          initialNumToRender={15}
          onScrollToIndexFailed={() =>
            setTimeout(() => animateNavbar(activeItemRef.current), 250)
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            const isActive = item.id === activeItem;

            return (
              <View key={item.id} style={styles.navbarItemContainer}>
                <NavbarItem
                  active={isActive}
                  onPress={() => onPressNavbarItem(item, index)}>
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
          contentContainerStyle={styles.navbarContainer}
        />
      </Animated.View>
    );
  },
);

const WrapperComponent = Platform.OS === 'android' ? Ripple : TouchableOpacity;

const NavbarItem = ({
  children = null,
  active = false,
  style = {},
  onPress = () => {},
}) => {
  return (
    <View style={styles.rippleFix}>
      <WrapperComponent
        activeOpacity={0.6}
        onPress={onPress}
        style={[
          styles.navbarItem,
          {
            backgroundColor: active
              ? colors['primary-dark']
              : colors['gray-40'],
          },
          style,
        ]}>
        {children}
      </WrapperComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    paddingBottom: 16,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: colors['gray-40'],
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
    borderRadius: 16,
    padding: 12,
  },
  rippleFix: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default React.memo(CategoriesNavbar, () => true);
