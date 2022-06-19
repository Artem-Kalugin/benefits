import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import MainBenefitsView from './MainBenefitsView';

import NavbarContext from '#contexts/navbarContext';

const MainBenefitsContainer = props => {
  const navbarRef = useContext(NavbarContext);
  const headerHeight = useSelector(store => store.navbar.headerHeight);

  const goToCategory = category => {
    navbarRef.current.animateNavbar(category.id);

    props.navigation.navigate('BenefitsCategory', {
      navbarItemId: category.id,
      category: category,
    });
  };

  return (
    <MainBenefitsView
      headerHeight={headerHeight}
      goToCategory={goToCategory}
      {...props}
    />
  );
};

export default MainBenefitsContainer;
