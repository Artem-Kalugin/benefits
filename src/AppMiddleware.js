import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { NavbarProvider } from '#contexts/navbarContext';

import CategoriesNavbar from '#components/CategoriesNavbar';

import RootStack from '#navigation';

import { changeIsVisible } from '#store/navbar/navbarSlice';

const AppMiddleware = props => {
  const dipsatch = useDispatch();
  const navbarState = useSelector(store => store.navbar);
  const navbarRef = useRef();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  useEffect(() => {
    if (['MainBenefits', 'BenefitsCategory'].includes(navbarState.route)) {
      dipsatch(changeIsVisible(true));
    } else {
      dipsatch(changeIsVisible(false));
    }
  }, [navbarState.route, dipsatch]);

  return (
    <NavbarProvider value={navbarRef}>
      <View style={style.container}>
        <CategoriesNavbar ref={navbarRef} navigationRef={props.navigationRef} />
        <RootStack />
      </View>
    </NavbarProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
export default AppMiddleware;
