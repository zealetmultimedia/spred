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
import axios from 'axios';
import { api } from '../../../src/helpers/api/api';
import { customHeaders } from '../../../src/helpers/api/apiConfig';

const ForgotPassword = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = text => {
    setEmail(text);
  };

  let payload = {
    emailAddress: email,
  };

  console.log(payload);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response = await axios.post(api.forgotPassword, payload, {
        headers: customHeaders(null),
      });
      console.log('forgot', response);
      setLoading(false);
      navigation.navigate('ResetPassword', {
        email: email,
      });
    } catch (error) {
      console.log('error', error?.response);
      setLoading(false);
    }
  };

  return (
    <ScrollView
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 12,
                marginTop: 40,
                height: 24,
                marginBottom: 30,
                paddingHorizontal: 24,
                tintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
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
                  style={{ color: '#ffffff', fontSize: 20, fontWeight: 700 }}
                >
                  Forgot your Password?
                </Text>
                <Text
                  style={{ color: '#ffffff', fontSize: 16, fontWeight: 400 }}
                >
                  Please enter your registered email
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',

                  //   marginTop: 60,
                }}
              >
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  autoComplete="off"
                  value={email}
                  onChangeText={handleChange}
                  style={{
                    color: '#ffffff',
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
              {loading ? (
                <ActivityIndicator size="large" color="#F45303" />
              ) : (
                <TouchableOpacity onPress={handleSubmit}>
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
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
