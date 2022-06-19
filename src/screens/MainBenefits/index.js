import React, { useContext } from 'react';

import MainBenefitsView from './MainBenefitsView';

import NavbarContext from '#contexts/navbarContext';

const MainBenefitsContainer = props => {
  const navbarRef = useContext(NavbarContext);

  const goToCategory = category => {
    navbarRef.current.animateNavbar(category.id);

    props.navigation.navigate('BenefitsCategory', {
      navbarItemId: category.id,
      category: category,
    });
  };

  return <MainBenefitsView goToCategory={goToCategory} {...props} />;
};

export default MainBenefitsContainer;
