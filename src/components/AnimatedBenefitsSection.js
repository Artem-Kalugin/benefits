import { screenWidth } from '#styles';
import React, { useRef } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
import BenefitCard from './BenefitCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedBenefitsSection = ({
  data = [],
  isCollapsed = false,
  itemSize = 0.8,
  ListFooterComponent = null,
  categoryId = -1,
}) => {
  const itemSizePx = itemSize * screenWidth;
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
          -itemSizePx / 2,
          xOffset.current.interpolate({
            inputRange: [
              itemSizePx * (index - 0.5),
              itemSizePx * index,
              itemSizePx * (index + 1),
            ],
            outputRange: [0 + itemSizePx / 3, itemSizePx / 2, itemSizePx],
            extrapolate: 'clamp',
          }),
        ),
      },
      {
        scale: xOffset.current.interpolate({
          inputRange: [
            itemSizePx * (index - 1),
            itemSizePx * index,
            itemSizePx * (index + 1.5),
          ],
          outputRange: [0.6, 1, 0.2],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: xOffset.current.interpolate({
      inputRange: [
        itemSizePx * (index - 0.5),
        itemSizePx * index,
        itemSizePx * (index + 1.5),
      ],
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    }),
  });

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
          <Animated.View style={getAnimationConfig(data.length - 0.35)}>
            {ListFooterComponent}
          </Animated.View>
        ) : null
      }
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <Animated.View style={getAnimationConfig(index)}>
          <BenefitCard
            categoryId={categoryId}
            item={item}
            title={isCollapsed ? '' : item.title}
            image={item.gallery[0].path}
            sale={item.sale}
            size={itemSize}
          />
        </Animated.View>
      )}
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
