import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  useColorScheme,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomText from '../../components/CustomText/CustomText';
import { useEffect, useState } from 'react';
import { getDataJson } from '../../../src/helpers/api/Asyncstorage';

const images = [
  { id: 1, photo: require('../../../assets/plus.png') },
  { id: 2, photo: require('../../../assets/Filedownload.png') },
  { id: 3, photo: require('../../../assets/wallet.png') },
  { id: 4, photo: require('../../../assets/time.png') },
];

const LeftIcon = () => <AntDesign name="left" size={18} color="white" />;

const SpredProfile = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    getStoredUserData();
  }, [navigation]);
  const getStoredUserData = async () => {
    const gotten2 = await getDataJson('UserInfo');
    console.log('This is the userInfo from home', gotten2);

    setUserInfo(gotten2);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToAccount = () => {
    navigation.navigate('Account');
  };

  const navigateToSpredWallet = () => {
    navigation.navigate('SpredWallet');
  };

  const renderIcons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 20,
        }}
      >
        {images.map(image => (
          <Image
            key={image.id}
            source={image.photo}
            style={{ marginRight: 10 }}
          />
        ))}
      </View>
    );
  };

  const SettingCard = ({ iconSource, label, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ marginRight: 10, marginLeft: 18 }}
            source={iconSource}
          />
          <CustomText fontWeight="600" fontSize={14}>
            {label}
          </CustomText>
        </View>
        <View>
          <Image
            style={{ marginRight: 10, marginLeft: 18 }}
            source={require('../../../assets/forwardicon.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const SettingCards = ({ iconSource, label }) => (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Image
          style={{ marginRight: 10, marginLeft: 18 }}
          source={iconSource}
        />
        <CustomText fontWeight="600" fontSize={14}>
          {label}
        </CustomText>
      </View>
      <View>
        <Image
          style={{ marginRight: 10, marginLeft: 18 }}
          source={require('../../../assets/forwardicon.png')}
        />
      </View>
    </View>
  );

  const renderSettings = () => {
    return (
      <View style={styles.card}>
        <SettingCard
          iconSource={require('../../../assets/Settings.png')}
          label="App Setting"
        />
        <View
          style={{ height: 1, backgroundColor: '#9D9D9D', marginVertical: 10 }}
        />
        <SettingCard
          iconSource={require('../../../assets/whiteperson.png')}
          label="Account"
          onPress={navigateToAccount}
        />
        <View
          style={{ height: 1, backgroundColor: '#9D9D9D', marginVertical: 10 }}
        />
        <SettingCard
          iconSource={require('../../../assets/whitespred.png')}
          label="Spred Wallet"
          onPress={navigateToSpredWallet}
        />
      </View>
    );
  };

  const renderSettingsTwo = () => {
    return (
      <View style={styles.card}>
        <SettingCards
          iconSource={require('../../../assets/Termsandconditions.png')}
          label="Terms and Conditions"
        />
        <View
          style={{ height: 1, backgroundColor: '#9D9D9D', marginVertical: 10 }}
        />
        <SettingCards
          iconSource={require('../../../assets/help.png')}
          label="Help"
        />
        <View
          style={{ height: 1, backgroundColor: '#9D9D9D', marginVertical: 10 }}
        />
        <SettingCards
          iconSource={require('../../../assets/Group.png')}
          label="About"
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#353535', width: '100%' }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.downloadsText}>My Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <Image
            style={{ marginRight: 10, marginLeft: 14 }}
            source={require('../../../assets/Searchbar.png')}
          />
          <Image
            style={{ marginRight: 10, marginLeft: 14, marginTop: 5 }}
            source={require('../../../assets/notificationbell.png')}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <View>
          <CustomText fontSize={15} style={{ color: 'white' }}>
            Hello {userInfo?.firstName}
          </CustomText>
          <CustomText color="white" fontSize={12}>
            {userInfo?.emailAddress}
          </CustomText>
        </View>
        <View>
          {/* <Image
            // source={require('../../../assets/Ellipse.png')}
            style={{}}
          /> */}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        {/* <View
          style={{ width: '80%', backgroundColor: '#F45305', borderRadius: 5 }}
        >
          {renderIcons()}
        </View> */}
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            width: '100%',
          }}
        >
          <View style={{ width: '80%' }}>{renderSettings()}</View>
          <View style={{ width: '80%' }}>{renderSettingsTwo()}</View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <CustomButton
          onPress={() => navigation.navigate('SignIn')}
          title="Sign Out"
          width="80%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  rightContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  downloadsText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },
  cardContainer: {
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#828282',
    borderRadius: 3,
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginLeft: 10,
    // width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#9D9D9D',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },

  cards: {
    backgroundColor: '#828282',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    // marginLeft: 10,
    // width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#9D9D9D',
  },

  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
});

export default SpredProfile;
