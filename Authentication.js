/* @flow */
import React, {useState} from 'react';
import {Text, View, Alert, Modal, TouchableOpacity} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  signUp,
  confirmSignUp,
  signIn,
  resendConfirmationCode,
} from './src/services/AuthServices';
import {changeScreen} from './src/utils/navigationHelper';
import styles from './AuthenticationStyles';
import ForgotPassword from './src/components/forgotPassword/ForgotPassword';

type AuthenticationProps = {
  componentId: string,
};

const Authentication = ({componentId}: AuthenticationProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fpModalVisible, setFPModalVisible] = useState(false);

  const handleSignUp = () => {
    if (username === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error!', 'Empty fields are not allowed.', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
      return;
    }
    if (password === confirmPassword) {
      setLoading(true);
      signUp(username, password)
        .then(user => {
          setModalVisible(true);
        })
        .catch(err => {
          if (err.code === 'UsernameExistsException') {
            setLoading(true);
            signIn(username, 'dummyPassword').catch(error => {
              if (error.code === 'UserNotConfirmedException') {
                Alert.alert(
                  'User already exists',
                  'Please enter the OTP sent to your mail.',
                  [
                    {
                      text: 'Ok!',
                      onPress: () => {
                        setLoading(false);
                        resendConfirmationCode(username);
                        setModalVisible(true);
                      },
                    },
                  ],
                );
              } else {
                Alert.alert('', 'User already exists.', [
                  {
                    text: 'Okay!',
                    onPress: () => {
                      setLoading(false);
                    },
                  },
                ]);
              }
            });
          } else {
            Alert.alert('Error!', 'Something went wrong.', [
              {
                text: 'Okay!',
                onPress: () => {
                  console.log('else err signup: ', err);
                  setLoading(false);
                },
              },
            ]);
          }
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

  const handleConfirmationCode = () => {
    setLoading(true);
    confirmSignUp(username, confirmationCode)
      .then(() => {
        setModalVisible(false);
        changeScreen('Home');
      })
      .catch(err => {
        Alert.alert('Error!', 'Please check if OTP is correct.', [
          {
            text: 'Oops!',
            onPress: () => {
              console.log('Confirmation Error: ', err);
            },
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  const handleResend = () => {
    resendConfirmationCode(username).then(() =>
      Toast.show('OTP Resent', {
        duration: Toast.durations.LONG,
        position: 60,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {},
      }),
    );
  };

  const handleSignIn = () => {
    setLoading(true);
    signIn(username, password)
      .then(res => {
        console.log('res', res);
        changeScreen('Home');
      })
      .catch(err => {
        console.log('errsignin: ', err);
        if (err.code === 'NotAuthorizedException') {
          Alert.alert('Retry', `${err.message}`, [
            {text: 'Ok', onPress: () => {}},
          ]);
        }
        if (err.code === 'UserNotFoundException') {
          Alert.alert('User not found', `${err.message}`, [
            {text: 'Ok', onPress: () => {}},
          ]);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 50}}>Welcome to TikTokClone!</Text>
      <Input
        label="Email"
        placeholder="my@email.com"
        onChangeText={value => setUsername(value.trim())}
      />
      <Input
        label="Password"
        placeholder="p@ssw0rd123"
        secureTextEntry
        onChangeText={value => setPassword(value)}
      />
      {!showLogin && (
        <Input
          label="Confirm Password"
          placeholder="p@ssw0rd123"
          onChangeText={value => setConfirmPassword(value)}
          secureTextEntry
        />
      )}
      <TouchableOpacity onPress={() => setFPModalVisible(true)}>
        <Text style={{color: 'red', marginVertical: 30, fontSize: 18}}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button
        title={showLogin ? 'Login' : 'Signup'}
        onPress={showLogin ? handleSignIn : handleSignUp}
      />
      <TouchableOpacity
        onPress={() => setShowLogin(prevShowLogin => !prevShowLogin)}>
        <Text style={{color: 'red', marginTop: 30, fontSize: 20}}>
          {showLogin ? 'Signup' : 'Login'} Instead?
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setLoading(false);
          setModalVisible(false);
        }}>
        <View style={styles.container}>
          <Input
            label="Confirmation Code"
            onChangeText={value => {
              setConfirmationCode(value);
            }}
          />
          <TouchableOpacity onPress={handleResend}>
            <Text style={{color: '#333333', marginVertical: 20}}>
              Resend OTP
            </Text>
          </TouchableOpacity>
          <Button title="Submit" onPress={handleConfirmationCode} />
        </View>
        <Button
          title="Close"
          style={styles.closeButton}
          onPress={() => {
            setLoading(false);
            setModalVisible(false);
          }}
        />
      </Modal>
      <ForgotPassword
        isVisible={fpModalVisible}
        setIsVisible={setFPModalVisible}
      />
      <Spinner visible={loading} textContent={'Loading...'} />
    </View>
  );
};

export default Authentication;
