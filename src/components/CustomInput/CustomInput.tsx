import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry
}) => {
  return (
    <TextInput
    secureTextEntry={secureTextEntry}
    inlineImageLeft='show'
      placeholder={placeholder}
      autoCapitalize='none'
      autoComplete='off'
      value={value}
      onChangeText={onChangeText}
    
      placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
  );
};

export default CustomTextInput;
