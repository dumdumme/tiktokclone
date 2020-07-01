import {Auth} from 'aws-amplify';

export const signUp = (username, password) => {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
    },
  });
};

export const confirmSignUp = (username, code) => {
  console.log(code);
  return Auth.confirmSignUp(username, code);
};

export const signIn = (username, password) => {
  return Auth.signIn(username, password);
};

export const resendConfirmationCode = username => {
  return Auth.resendSignUp(username);
};

export const signOut = () => {
  console.log('SignOut pressed');
  return Auth.signOut();
};

export const forgotPassword = username => {
  return Auth.forgotPassword(username);
};

export const forgotPasswordSubmit = (username, code, new_password) => {
  return Auth.forgotPasswordSubmit(username, code, new_password);
};
