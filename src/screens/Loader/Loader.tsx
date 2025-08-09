import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  View,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';

const Loader = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace("Onboarding");
        }, 3000);
      });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <ImageBackground
        source={require('../../../assets/loader.png')}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      ></ImageBackground>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
