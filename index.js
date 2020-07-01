/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import Home from './src/views/home/Home';
import Authentication from './Authentication';

console.log(awsconfig);

Amplify.configure(awsconfig);

Navigation.registerComponent('Authentication', () => Authentication);
Navigation.registerComponent('Home', () => Home);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Authentication',
            },
          },
        ],
      },
    },
  });
});
