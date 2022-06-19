import React, { useRef, useEffect, useState } from 'react';

import BenefitsCategoryView from './BenefitsCategoryView';

const benefitsByCategory = require('../../snitchedData/json/benifitsByCategory.json');

const BenefitsCategoryContainer = props => {
  const category = props.route.params.category;
  const { title } = category;

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
  }, [category.id]);

  return (
    <BenefitsCategoryView
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
