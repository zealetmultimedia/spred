import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText/CustomText';

const CustomButton = ({
  title,
  image,
  onPress,
  width,
  height,
  borderRadius,
  backgroundColor,
  disabled
}) => {
  const buttonStyle = {
    width: width || '100%',
    height: height || 50,
    backgroundColor: backgroundColor || '#F45303',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius || 5,
    flexDirection: 'row', // Align text and image horizontally
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, buttonStyle]}>
      {image && <Image source={image} style={styles.buttonImage} />}
      <CustomText fontSize={10} style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F45303',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default CustomButton;
