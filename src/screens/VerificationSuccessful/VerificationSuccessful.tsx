import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  useColorScheme,
  ImageBackground,
  StatusBar,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const VerificationSuccessful = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //phone verification
  const isPasswordValid = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password,
    );
    const hasMinimumLength = password.length >= 8;

    return (
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar &&
      hasMinimumLength
    );
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setErrorTitle('Passwords do not match');
      setErrorMessage(' Enter your new password again');
      return;
    }
    const isValid = isPasswordValid(password);
    if (isValid) {
      setErrorTitle('');
      setErrorMessage('');
      navigation.navigate('Success');
    } else {
      setErrorTitle('Invalid password');
      setErrorMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and have a minimum length of 8 characters.',
      );
    }
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor:  '#353535',
        flex: 1,
      }}
    >
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 12,
                marginTop: 40,
                height: 24,
                marginBottom: 30,
                paddingHorizontal: 24,
                tintColor:  '#000000',
              }}
              source={require('../../../assets/arrowLeft.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: '80%',
                height: 80,
                marginBottom: 30,
              }}
              source={require('../../../assets/logo1.png')}
            />
          </View>
          <View style={{ height: 20 }} />

          <View style={{ height: 40 }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              //   height: 600,
              width: '100%',
              flex: 1,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#333333',
                // height: 600,
                width: '100%',
                paddingHorizontal: 24,
                flex: 1,
              }}
            >
              {errorMessage === '' ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // paddingHorizontal: 24,
                    marginTop: 100,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#F45303',
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 30,
                    }}
                  >
                    Verification successful
                  </Text>
                  <Text
                    style={{ color: '#ffffff', fontSize: 16, fontWeight: 400 }}
                  >
                    Reset your password {'\n'}Passwords must contain numbers,
                    letters and {'\n'}
                    punctuation marks.
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    backgroundColor: '#878787',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // padding: '24',
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: '#ffffff' }}
                  >
                    {errorTitle}
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: '#ffffff' }}
                  >
                    {errorMessage}
                  </Text>
                </View>
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',

                  //   marginTop: 60,
                }}
              >
                <TextInput
                  placeholder="Enter new password"
                  value={password}
                  onChangeText={setPassword}
                  style={{
                    color: '#ffffff' , 
                    backgroundColor: '#353535',
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                  }}
                />
                <TextInput
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{
                    color: '#ffffff' , 
                    backgroundColor: '#353535',
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                  }}
                />
              </View>
              <View style={{ height: 40 }} />
              <TouchableOpacity onPress={validatePassword}>
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: '#F45303',
                    justifyContent: 'center',
                    paddingHorizontal: 24,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#ffffff',
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    Reset Password
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default VerificationSuccessful;

const styles = StyleSheet.create({});
