/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
// import {
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   View,
//   useColorScheme,
//   StatusBar,
//   TextInput,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import CustomButton from '../../components/CustomButton/CustomButton';
// import CustomText from '../../components/CustomText/CustomText';

// const data = [
//   {
//     id: 1,
//     name: 'Bolaji Zealet',
//     username: 'Bolaji Zealet Rasaq',
//     gender: 'Male',
//   },
// ];

// const LeftIcon = () => <AntDesign name="left" size={18} color="white" />;
// const SearchIcon = () => <AntDesign name="search1" size={25} color="#FFFFFF" />;
// const BellIcon = () => <AntDesign name="bells" size={25} color="white" />;

// const Account = () => {
//   const navigation = useNavigation();

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const renderPerson = () => {
//     return data.map(person => {
//       return (
//         <View key={person.id}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Image
//               style={{ marginRight: 10, marginLeft: 10 }}
//               source={require('../../../assets/Person.png')}
//             />
//             <View style={styles.card}>
//               <CustomText style={styles.cardText}>{person.name}</CustomText>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Image
//               style={{ marginRight: 10, marginLeft: 18 }}
//               source={require('../../../assets/Vector.png')}
//             />
//             <View style={styles.card}>
//               <CustomText style={styles.cardText}>{person.username}</CustomText>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Image
//               style={{ marginRight: 10, marginLeft: 14 }}
//               source={require('../../../assets/Person-pin.png')}
//             />
//             <View style={styles.card}>
//               <CustomText style={styles.cardText}>{person.gender}</CustomText>
//             </View>
//           </View>
//         </View>
//       );
//     });
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#353535', width: '100%' }}>
//       <View style={styles.container}>
//         <View style={styles.leftContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image source={require('../../../assets/icon.png')} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <CustomText style={styles.downloadsText}>My Profile</CustomText>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.rightContainer}>
//           <Image
//             style={{ marginRight: 10, marginLeft: 14 }}
//             source={require('../../../assets/Searchbar.png')}
//           />
//           <Image
//             style={{ marginRight: 10, marginLeft: 14, marginTop: 5 }}
//             source={require('../../../assets/notificationbell.png')}
//           />
//         </View>
//       </View>
//       {/* //start here */}
//       <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//           <Image source={require('../../../assets/Ellipse.png')} />
//           <View style={{ marginTop: 10, alignItems: 'center' }}>
//             <CustomText style={{ color: 'white' }}>
//               Bolaji Zealet Rasaq
//             </CustomText>
//             <CustomText style={{ color: 'white', fontSize: 9 }}>
//               Mobile +2348162599199
//             </CustomText>
//             <CustomText style={{ color: 'white', fontSize: 9 }}>
//               bolarzeal@gmail.com
//             </CustomText>
//           </View>
//         </View>
//         <View style={{ marginTop: 20 }}>{renderPerson()}</View>
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <CustomButton title="Save" backgroundColor="#4F4F4F" width="90%" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     marginTop: 50,
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     marginTop: 50,
//   },
//   downloadsText: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     marginLeft: 10,
//   },
//   cardContainer: {
//     marginVertical: 20,
//   },

//   card: {
//     backgroundColor: '#4F4F4F',
//     borderRadius: 10,
//     marginVertical: 5,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginLeft: 10,
//     width: '80%',
//   },

//   cardText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
// });

// export default Account;

import {
  Text,
  ScrollView,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../components/Backheader/Backheader';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { api } from '../../../src/helpers/api/api';
import { customHeaders } from '../../../src/helpers/api/apiConfig';
import { getDataJson, storeDataJson } from '../../helpers/api/Asyncstorage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const Account = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({ token: '', id: '' });
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function load() {
      const gotten = await getDataJson('UserInfo');
      console.log('i git this', gotten);
      const gotten2 = await getDataJson('User');
      const gotten3 = await getDataJson('Profile');
      const toSet = {
        firstName: gotten.firstName ?? '',
        lastName: gotten.lastName ?? '',
        email: gotten.emailAddress ?? '',
        username: gotten.username ?? '',
      };
      setState(toSet);
      setUser(gotten2);
      setProfile(gotten3);
      console.log(gotten);
      console.log(gotten2);
    }
    load();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response);
        handleChange('image', response.assets[0].uri);
      }
    });
  };

  const handleChange = (key: string, value: any) => {
    setState(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  let payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    username: state.username,
  };

  const uploadImage = async binaryData => {
    console.log('user id', user.id);

    try {
      const formData = new FormData();
      formData.append('file', new Blob([binaryData]));

      const response = await fetch(
        api.uploadImage + '/' + user.id + '/uploadImage',
        {
          method: 'PATCH',
          body: formData,
          headers: {
            mobileAppByPassIVAndKey:
              'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9f',
            username: 'SpredMediaAdmin',
            password: 'SpredMediaLoveSpreding@2023',
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      const data = await response.json();
      console.log('Data uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const handleSubmit = async () => {
    if (selectedImage !== null) {
      const binaryData = await RNFS.readFile(
        selectedImage.assets[0].uri,
        'base64',
      );
      uploadImage(binaryData);
    }
    setLoading(true);
    console.log('payload to be sent', payload);
    const url = `${api.getUserDetails}/${user?.id}/edit-user-detail`;
    try {
      console.log('to be sent', payload);
      let response = await axios.put(url, payload, {
        headers: customHeaders(user?.token),
      });
      console.log('register res', response);
      setLoading(false);
      const config = {
        headers: {
          mobileAppByPassIVAndKey:
            'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
          username: 'SpredMediaAdmin',
          password: 'SpredMediaLoveSpreding@2023',
          Authorization: `Bearer ${user.token}`, // Add the Authorization header with the token
        },
      };
      let response2 = await axios.get(
        `${api.getUserDetails}/${user.id}/get-a-user-by-userId`,
        config,
      );
      await storeDataJson('UserInfo', response2?.data?.data);
      Alert.alert('Success', 'Successfully Saved');
      navigation.goBack();
    } catch (err) {
      console.log('backend error', err?.response);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
  };
  //input fields must not be empty
  const isButtonEnabled =
    state.email.length && state.firstName.length && state.lastName.length;
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
            Your Spred Account Information
          </Text>
        </View>
        <View style={{ height: 40 }} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {selectedImage === null ? (
            <Image
              style={{
                height: 80,
                width: 80,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
              source={require('../../../assets/ava.jpg')}
            />
          ) : (
            <Image
              style={{
                height: 80,
                width: 80,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
              source={{ uri: `${selectedImage.assets[0].uri}` }}
            />
          )}
          {/* <TouchableOpacity
            onPress={openImagePicker}
            style={{ flexDirection: 'row', padding: 10 }}
          >
            <AntDesign name="edit" size={18} style={{ color: 'white' }} />
            <Text style={{ color: 'white', marginLeft: 4 }}>Change</Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ color: 'white', paddingBottom: 2 }}>First Name</Text>
          <CustomTextInput
            placeholder="First name"
            value={state.firstName}
            onChangeText={(text: any) => handleChange('firstName', text)}
            secureTextEntry={undefined}
          />

          <Text style={{ color: 'white', paddingBottom: 2 }}>Last Name</Text>
          <CustomTextInput
            placeholder="Last name"
            value={state.lastName}
            onChangeText={(text: any) => handleChange('lastName', text)}
            secureTextEntry={undefined}
          />

          <Text style={{ color: 'white', paddingBottom: 2 }}>Email</Text>
          <CustomTextInput
            placeholder="email"
            value={state.email}
            onChangeText={(text: any) => handleChange('email', text)}
            secureTextEntry={undefined}
          />

          <Text style={{ color: 'white', paddingBottom: 2 }}>Username</Text>
          <CustomTextInput
            placeholder="username"
            value={state.username}
            onChangeText={(text: any) => handleChange('username', text)}
            secureTextEntry={undefined}
          />

          {error.length > 0 && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          )}

          <View
            style={{
              justifyContent: 'flex-end',
              display: 'flex',
              flexDirection: 'row',
              //   paddingHorizontal: 10,
              marginBottom: 30,
            }}
          />
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <CustomButton
              backgroundColor={'red'}
              disabled={false}
              title="Save"
              onPress={handleSubmit}
              image={undefined}
              width={undefined}
              height={undefined}
              borderRadius={undefined}
            />
          )}
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <CustomButton
              // backgroundColor={'red'}
              title="Change Password"
              onPress={() => navigation.navigate('ForgotPassword')}
              image={undefined}
              width={undefined}
              height={undefined}
              borderRadius={undefined}
              disabled={undefined}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;
