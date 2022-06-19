import React, { useRef, useEffect, useState, useContext } from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';

import BenefitsCategoryView from './BenefitsCategoryView';

import NavbarContext from '#contexts/navbarContext';

const benefitsByCategory = require('../../snitchedData/json/benifitsByCategory.json');

const BenefitsCategoryContainer = props => {
  const category = props.route.params.category;
  const { title } = category;

  const navbarRef = useContext(NavbarContext);

  const navbarState = useSelector(store => store.navbar);

  const flatListRef = useRef();

  const [items, setItems] = useState(
    benefitsByCategory.data.find(el => el.id === category.id)?.benefits,
  );

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const goBackToMain = () => {
    if (navbarState.route !== 'BenefitsCategory') {
      return false;
    }

    props.navigation.replace('MainBenefits', {
      animationTypeForReplace: 'pop',
    });

    navbarRef.current.animateNavbar(-1);

    return true;
  };

  useEffect(() => {
    setItems(
      benefitsByCategory.data.find(el => el.id === category.id)?.benefits,
    );

    BackHandler.addEventListener('hardwareBackPress', goBackToMain);

    return () => {
      console.log('unsub');
      BackHandler.removeEventListener('hardwareBackPress', goBackToMain);
    };
  }, [category.id, navbarState.route]);

  return (
    <BenefitsCategoryView
      headerHeight={navbarState.headerHeight}
      flatListRef={flatListRef}
      categoryId={category.id}
      items={items}
      scrollToTop={scrollToTop}
      title={title}
      {...props}
    />
  );
};

export default BenefitsCategoryContainer;
