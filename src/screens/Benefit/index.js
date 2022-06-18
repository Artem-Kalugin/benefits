import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BenefitView from './BenefitView';

const BenefitContainer = props => {
  const { title, gallery, categoryId } = props.route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content');
  }, [isFocused]);

  return (
    <BenefitView
      categoryId={categoryId}
      title={title}
      gallery={gallery}
      {...props}
    />
  );
};

export default BenefitContainer;
