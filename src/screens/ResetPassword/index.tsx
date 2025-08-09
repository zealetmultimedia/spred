import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../components/Backheader/Backheader';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { api } from '../../../src/helpers/api/api';
import { customHeaders } from '../../../src/helpers/api/apiConfig';
import Snackbar from 'react-native-snackbar';

const ResetPassword = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

  const [state, setState] = useState({
    email: email,
    number: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleChange = (key, value) => {
    setState(prevData => ({
      ...prevData,
      [key]: value,
    }));

    if (key === 'password') {
      setPasswordValid(validatePassword(value));
    }
  };
  // Password validation function
  const validatePassword = (password: string) => {
    // Define a regular expression pattern to match your criteria
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return pattern.test(password);
  };

  let payload = {
    email: state.email,
    token: state.number,
    newPassword: state.password,
    confirmPassword: state.confirmPassword,
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (state.password !== state.confirmPassword) {
      setLoading(false);
      // Display an error message or handle the mismatch
      Alert.alert('Passwords do not match');
      return;
    }

    console.log('payload to be sent', payload);
    try {
      let response = await axios.post(api.resetPassword, payload, {
        headers: customHeaders(null),
      });
      console.log('fr res', response);
      setLoading(false);
      navigation.navigate('SignIn');
    } catch (error) {
      Snackbar.show({
        text: 'An error occured',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('backend error', error?.response);
      setLoading(false);
    }
  };
  //input fields must not be empty
  const isButtonEnabled =
    state.email.length && state.number.length && state.password.length >= 3;
  console.log('false', isButtonEnabled);
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
        width: '100%',
        height: '100%',
        backgroundColor: '#353535',
      }}
    >
      {Platform.OS === 'android' && (
        <StatusBar backgroundColor="#050505" barStyle="light-content" />
      )}
      <ScrollView>
        <BackHeader />
        <View style={{ height: 20 }} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ color: '#F45303', fontSize: 26, fontWeight: 500 }}>
            Reset Your Password
          </Text>
        </View>
        <View style={{ height: 40 }} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 24,
          }}
        >
          <CustomTextInput
            placeholder="email"
            value={state.email}
            onChangeText={text => handleChange('email', text)}
          />

          <CustomTextInput
            placeholder="Enter your six digits code"
            value={state.number}
            onChangeText={text => handleChange('number', text)}
          />

          <CustomTextInput
            placeholder="Enter your new password"
            value={state.password}
            onChangeText={text => handleChange('password', text)}
          />
          {!passwordValid && (
            <Text style={{ color: 'red', marginBottom: 10 }}>
              Password must include a capital letter, a combination of letters
              and numbers, at least 8 characters, and a special character.
            </Text>
          )}
          <CustomTextInput
            placeholder="Confirm your new password"
            value={state.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />

          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <CustomButton
              backgroundColor={!isButtonEnabled && '#82543c'}
              disabled={!isButtonEnabled}
              title="Reset Password"
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
