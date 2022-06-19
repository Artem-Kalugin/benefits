import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { useIsFocused } from '@react-navigation/native';

import BenefitView from './BenefitView';

const BenefitContainer = props => {
  const { title, gallery, categoryId } = props.route.params;

  const isFocused = useIsFocused();
  const navbarState = useSelector(store => store.navbar);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content');
  }, [isFocused]);

  return (
    <BenefitView
      prevRoute={navbarState.prevRoute}
      categoryId={categoryId}
      title={title}
      gallery={gallery}
      {...props}
    />
  );
};

export default BenefitContainer;
