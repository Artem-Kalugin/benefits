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

  const headerHeight = useSelector(store => store.navbar.headerHeight);

  const flatListRef = useRef();

  const [items, setItems] = useState(
    benefitsByCategory.data.find(el => el.id === category.id)?.benefits,
  );

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  useEffect(() => {
    setItems(
      benefitsByCategory.data.find(el => el.id === category.id)?.benefits,
    );

    BackHandler.addEventListener('hardwareBackPress', function () {
      props.navigation.replace('MainBenefits', {
        animationTypeForReplace: 'pop',
      });

      navbarRef.current.animateNavbar(-1);

      return true;
    });
  }, [category.id]);

  return (
    <BenefitsCategoryView
      headerHeight={headerHeight}
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
