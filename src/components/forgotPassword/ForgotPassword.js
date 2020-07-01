import React, {useState} from 'react';
import {View, Modal, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {
  forgotPassword,
  forgotPasswordSubmit,
} from '../../services/AuthServices';
import styles from './ForgotPasswordStyles';
import Spinner from 'react-native-loading-spinner-overlay';

type ForgotPasswordProps = {
  isVisible: boolean,
  setIsVisible: Function,
};

const ForgotPassword = ({isVisible, setIsVisible}: ForgotPasswordProps) => {
  const [username, setUsername] = useState('');
  const [showInputs, setShowInputs] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (username === '') {
      Alert.alert('Error', 'Please provide a username.', [
        {text: 'Ok', onPress: () => {}},
      ]);
    }
    setLoading(true);
    forgotPassword(username)
      .then(() => setShowInputs(true))
      .catch(err => console.log('forgot pass: ', err))
      .finally(() => setLoading(false));
  };

  const handleForgotPasswordSubmit = () => {
    if (password !== '' && password === confirmPassword) {
      setLoading(true);
      forgotPasswordSubmit(username, confirmationCode, password)
        .then(res =>
          Alert.alert('Success', 'Password reset successful.', [
            {
              text: 'Ok',
              onPress: () => {
                setLoading(false);
                setIsVisible(false);
              },
            },
          ]),
        )
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      Alert.alert('Error!', 'Passwords do not match.', [
        {
          text: 'Oops!',
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
      {!showInputs && (
        <View style={styles.container}>
          <Input
            label="Username"
            onChangeText={value => setUsername(value.trim())}
          />
          <Button title="Submit" onPress={handleForgotPassword} />
        </View>
      )}
      {showInputs && (
        <View style={styles.container}>
          <Input
            label="Confirmation Code"
            onChangeText={value => {
              setConfirmationCode(value);
            }}
          />
          <Input
            label="Password"
            placeholder="p@ssw0rd123"
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <Input
            label="Confirm Password"
            placeholder="p@ssw0rd123"
            onChangeText={value => setConfirmPassword(value)}
            secureTextEntry
          />
          <Button title="Submit" onPress={handleForgotPasswordSubmit} />
        </View>
      )}
      <Button
        title="Close"
        style={styles.closeButton}
        onPress={() => setIsVisible(false)}
      />
      <Spinner visible={loading} textContent={'Loading...'} />
    </Modal>
  );
};

export default ForgotPassword;
