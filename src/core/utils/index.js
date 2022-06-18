import { LayoutAnimation } from 'react-native';

export const requestDummy = data => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000 * Math.random() * 2.5 + 500);
  });

  return promise;
};

export const animateLayout = (onAnimationEnd = () => {}) => {
  LayoutAnimation.configureNext(
    {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    },
    () => {
      onAnimationEnd();
    },
  );
};
