import React from 'react';
import {View, Text} from 'react-native';
import styles from '../home/HomeStyles';
import {Button} from 'react-native-elements';
import {signOut} from '../../services/AuthServices';
import {changeScreen} from '../../utils/navigationHelper';

const Home = () => {
  const handleSignOut = () => {
    console.log('Logout pressed');
    signOut()
      .then(() => {
        console.log('successful logout');
        changeScreen('Authentication');
      })
      .catch(err => console.log('Sign Out Error', err));
  };
  return (
    <View style={styles.container}>
      <Text>Home Page Here</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Home;
