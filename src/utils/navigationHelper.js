/* @flow */

import {Navigation} from 'react-native-navigation';

export const changeScreen = (screen: string, props: Object) =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screen,
              passProps: props,
            },
          },
        ],
      },
    },
  });

export const pushScreen = (
  componentId: string,
  screen: string,
  passProps: Object,
) => {
  console.log(componentId, 'push');
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps,
    },
  });
};

export const popScreen = (componentId: string) => {
  Navigation.pop(componentId);
};
