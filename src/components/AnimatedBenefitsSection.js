import React, { useRef } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';

import BenefitCard from './BenefitCard';

import { NEW_BENEFITS_WIDTH } from '#config';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedBenefitsSection = ({
  data = [],
  isCollapsed = false,
  itemWidth = NEW_BENEFITS_WIDTH,
  ListFooterComponent = null,
  categoryId = -1,
}) => {
  const styles = getStyles();

  const xOffset = useRef(new Animated.Value(0));

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: xOffset.current } } }],
    { useNativeDriver: true },
  );

  const getAnimationConfig = index => ({
    transform: [
      {
        translateX: Animated.add(
          0,
          xOffset.current.interpolate({
            inputRange: [
              itemWidth * (index - 1),
              itemWidth * index,
              itemWidth * (index + 1),
            ],
            outputRange: [0 - itemWidth / 4, 0, 0],
            extrapolate: 'clamp',
          }),
        ),
      },
      {
        scale: xOffset.current.interpolate({
          inputRange: [
            itemWidth * (index - 1.5),
            itemWidth * index,
            itemWidth * (index + 1.5),
          ],
          outputRange: [0.35, 1, 0.35],
          extrapolate: 'clamp',
        }),
      },
    ],
    // opacity: xOffset.current.interpolate({
    //   inputRange: [
    //     itemWidth * (index - 0.5),
    //     itemWidth * index,
    //     itemWidth * (index + 1.5),
    //   ],
    //   outputRange: [0.6, 1, 0.6],
    //   extrapolate: 'clamp',
    // }),
  });

  const renderItem = ({ item, index }) => (
    <Animated.View style={getAnimationConfig(index)}>
      <BenefitCard
        categoryId={categoryId}
        item={item}
        title={isCollapsed ? '' : item.title}
        image={item.gallery[0].path}
        sale={item.sale}
        width={itemWidth}
      />
    </Animated.View>
  );

  return (
    <AnimatedFlatList
      contentContainerStyle={styles.benefitsListContainer}
      data={data}
      horizontal={true}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={
        ListFooterComponent ? (
          <Animated.View style={getAnimationConfig(data.length - 0.25)}>
            {ListFooterComponent()}
          </Animated.View>
        ) : null
      }
      maxToRenderPerBatch={2}
      updateCellsBatchingPeriod={50}
      initialNumToRender={6}
      windowSize={10}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    benefitsListContainer: {
      paddingHorizontal: 10,
    },
  });

export default AnimatedBenefitsSection;
