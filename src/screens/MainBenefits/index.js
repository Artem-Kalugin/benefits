import { animateLayout } from '#utils';
import React, { useState } from 'react';
import MainBenefitsView from './MainBenefitsView';

const MainBenefitsContainer = props => {
  const [activeItem, setActiveItem] = useState(-1);

  const changeActiveItem = id => {
    animateLayout();
    setActiveItem(id);
  };

  return (
    <MainBenefitsView
      activeItem={activeItem}
      setActiveItem={changeActiveItem}
      {...props}
    />
  );
};

export default MainBenefitsContainer;
