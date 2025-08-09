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
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import BackHeader from '../../components/Backheader/Backheader';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios, { AxiosError } from 'axios';
import { api } from '../../../src/helpers/api/api';
import { customHeaders } from '../../../src/helpers/api/apiConfig';
import { storeDataJson } from '../../../src/helpers/api/Asyncstorage';
import Visible from '../../../assets/videoplay.png';
import Snackbar from 'react-native-snackbar';
import { err } from 'react-native-svg/lib/typescript/xml';
import { type } from '@testing-library/react-native/build/user-event/type';

const SignIn = () => {
  const navigation: any = useNavigation();
  const [state, setState] = useState({ number: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (key, value) => {
    setState(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const payload = {
    email: state.number,
    password: state.password,
  };

  const validateNumber = async () => {
    console.log('1');
    if (state.number === '' || state.password === '') {
      Alert.alert(' Email or Password cannot be empty');
      return;
    }

    setLoading(true);
    console.log('payload to be sent', payload);
    try {
      let response = await axios.post(api.login, payload, {
        headers: customHeaders(null),
      });
      console.log('2');
      //user Config
      const config = {
        headers: {
          mobileAppByPassIVAndKey:
            'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
          username: 'SpredMediaAdmin',
          password: 'SpredMediaLoveSpreding@2023',
          Authorization: `Bearer ${response?.data?.data?.token}`, // Add the Authorization header with the token
        },
      };
      console.log('2');
      let response2 = await axios.get(
        `${api.getUserDetails}/${response?.data?.data && response?.data?.data?.id
        }/get-a-user-by-userId`,
        config,
      );
      let response3 = await axios.get(
        `${api.getProfileId}/${response?.data?.data && response?.data?.data?.id
        }/get-all-user-profiles-by-userId`,
        config,
      );
      console.log('res 2', response2);
      console.log('res 3', response3?.data?.data);
      console.log('3');
      setLoading(false);
      await storeDataJson('User', response?.data?.data);
      await storeDataJson('Profile', response3?.data?.data);
      console.log('4');
      await storeDataJson('UserInfo', response2?.data?.data);
      console.log('5');
      navigation.navigate('dashboard', {
        token: response?.data?.data?.token,
      });
    } catch (error) {
      console.log('backend login error', JSON.stringify(error));
      setLoading(false);

      // Handle specific error cases
      if (error?.response?.data?.message === "User's account is not confirmed") {
        Snackbar.show({
          text: 'Please confirm your email address before logging in. Check your email for the verification code.',
          duration: Snackbar.LENGTH_LONG,
        });
        // Optionally navigate to email confirmation screen
        navigation.navigate('ConfirmEmail', {
          email: state.number,
        });
      } else {
        Snackbar.show({
          text: 'Incorrect email/password, please try again',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#353535',
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

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingHorizontal: 24,
              marginBottom: 30,
            }}
          >
            <Text style={{ color: '#F45303', fontSize: 26, fontWeight: 500 }}>
              Welcome to Spred
            </Text>
            <Text style={{ color: '#999999', fontSize: 18, fontWeight: 500 }}>
              Enter your credentials to continue
            </Text>
          </View>

          <View style={{ height: 40 }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height: 400,
              width: '100%',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#333333',
                height: 500,
                width: '100%',
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',

                  marginTop: 60,
                }}
              >
                <CustomTextInput
                  placeholder="Enter your email address"
                  value={state.number}
                  onChangeText={text => handleChange('number', text)}
                />
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    placeholder="Enter Password"
                    secureTextEntry={!isPasswordVisible}
                    value={state.password}
                    onChangeText={text => handleChange('password', text)}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      style={{
                        width: 20,
                        marginRight: 10,
                        height: 20,
                      }}
                      source={
                        isPasswordVisible
                          ? require('../../../assets/notvisible.png')
                          : require('../../../assets/visible.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                  flexDirection: 'row',
                  //   paddingHorizontal: 10,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text
                    style={{ color: '#FCE2D5', fontWeight: 400, fontSize: 16 }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <CustomButton title="Login" onPress={validateNumber} />
              )}
              <View style={{ height: 20 }} />
              <View
                style={{
                  // backgroundColor: '#BDBDBD',

                  // height: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#ffffff' }}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={{ color: '#F45303' }}> Register</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 5,
                }}
              >
                {/* <Text
                  style={{ color: '#999999', fontSize: 16, fontWeight: 400 }}
                >
                  Or connect via
                </Text> */}
              </View>
              {/* <View
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 110,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('../../../assets/google.png')}
                  />
                </View>
                <View
                  style={{
                    height: 50,
                    width: 110,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('../../../assets/facebook.png')}
                  />
                </View>
                <View
                  style={{
                    height: 50,
                    width: 110,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginBottom: 20,
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require('../../../assets/apple.png')}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    color: '#ffffff',
    backgroundColor: '#353535',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    // alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    color: '#ffffff',
    // backgroundColor: '#353535',
    width: '90%',
    height: 50,
    // borderWidth: 1,
    // borderColor: '#ffffff',
    alignItems: 'center',
    // paddingHorizontal: 20,
    // marginBottom: 20,
  },
});
