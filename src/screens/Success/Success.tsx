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

const Success = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: colorScheme === 'light' ? '#ffffff' : '#353535',
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
        ></View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: 600,
            width: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#030303',
              height: 600,
              width: '100%',
              paddingHorizontal: 24,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                backgroundColour: '#000000',
                height:176,
              }}
            >
                 {/* <Image
              style={{
                width: '80%',
                height: 80,
                marginBottom: 30,
              }}
              source={require('../../../assets/vector.png')}
            />  */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
