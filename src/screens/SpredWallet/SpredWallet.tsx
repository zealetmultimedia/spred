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
  Clipboard,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Modalize } from 'react-native-modalize';
import { useEffect, useRef, useState } from 'react';
import { getDataJson } from '../../helpers/api/Asyncstorage';
import axios from 'axios';
import { api } from '../../helpers/api/api';

const LeftIcon = () => <AntDesign name="left" size={18} color="white" />;

const SpredWallet = () => {
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const [walletDetails, setWalletDetails] = useState({});
  const [virtualAcctDetails, setVirtualAcctDetails] = useState({});
  const [getBalnace, setGetBalance] = useState<{
    currency?: string;
    available_balance?: number;
    ledger_balance?: number;
  }>({ currency: '', available_balance: 0, ledger_balance: 0 });
  const [loadingBalance, setLoadingBalance] = useState(false);

  const [user, setUser] = useState({});
  const token = user?.token;
  const id = user?.id;
  console.log('its here wallet', id, user?.token);
  useEffect(() => {
    getStoredUserData();
    get();
    fetchVirtualaccount();
    fetchAccountBalance();
  }, []);

  const onRefresh = () => {
    getStoredUserData();
    get();
    fetchVirtualaccount();
    fetchAccountBalance();
  };
  const getStoredUserData = async () => {
    const gotten = await getDataJson('User');
    console.log('This is the user details', gotten);
    setUser(gotten);
  };

  const config = {
    headers: {
      mobileAppByPassIVAndKey:
        'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
      username: 'SpredMediaAdmin',
      password: 'SpredMediaLoveSpreding@2023',
      Authorization: `Bearer ${token}`, // Add the Authorization header with the token
    },
  };
  const get = async () => {
    try {
      let response = await axios.get(`${api.getWalletDetails}/${id}`, config);
      console.log('wallet detals', response);
      setWalletDetails(response?.data?.data);
      // console.log( 'movies array', response?.data?.data[3]?.genreId);
      // setMovieArray(response?.data?.data)
      // setLoading(false)
      // navigation.navigate('dashboard');
    } catch (error) {
      console.log('Wallet details error', error?.response);
      // setLoading(false);
    }
  };
  const fetchVirtualaccount = async () => {
    try {
      let response = await axios.get(
        `${api.fetchVirtualAccount}/${walletDetails?.account_Reference}`,
        config,
      );
      console.log('virtual account details detals', response);
      setVirtualAcctDetails(response?.data?.data[0]);
    } catch (error) {
      console.log(' error  on virtual wallet', error?.response);
      // setLoading(false);
    }
  };

  const fetchAccountBalance = async () => {
    setLoadingBalance(true);
    try {
      let response = await axios.get(
        `${api.fecthAccountBalance}/${walletDetails?.account_Reference}?currency=NGN`,
        config,
      );
      console.log('wallet account balance', response);
      setGetBalance(response?.data?.data);
      setLoadingBalance(false);
      // console.log( 'movies array', response?.data?.data[3]?.genreId);
      // setMovieArray(response?.data?.data)
      // setLoading(false)
      // navigation.navigate('dashboard');
    } catch (error) {
      console.log(' error  on wallet balance', error?.response);
      setLoadingBalance(false);
    }
  };
  const copyAccountNumber = accountNumber => {
    Clipboard.setString(accountNumber);
    Alert.alert('Account number copied to clipboard');
  };
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#353535',
          width: '100%',
          // marginTop: 10,
        }}
        refreshControl={
          <RefreshControl
            // titleColor='#fff'
            refreshing={loadingBalance}
            onRefresh={onRefresh}
            // title="Pull to refresh"
            colors={['white']} // Change the loading spinner color
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../../../assets/icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.downloadsText}>Spred Wallet</Text>
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
        <View style={{ marginTop: 10 }}>
          {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ marginRight: 10, marginLeft: 18 }}
            source={require('../../../assets/whitespred.png')}
          />
          <Text style={{ color: 'white' }}>Spred Wallet</Text>
        </View> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

              marginTop: 5,
            }}
          >
            <Text style={{ color: '#F45303', fontSize: 14, fontWeight: '700' }}>
              WALLET DETAILS
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.card}>
            <View>
              <Text style={styles.cardText}>Available Balance</Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: 'black',
                marginVertical: 10,
                width: '100%',
              }}
            />

            <View>
              <Text style={styles.cardText}>
                ₦{getBalnace?.available_balance ?? 0.0}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <CustomButton
            onPress={() => {
              navigation.navigate('Deposit');
            }}
            title="Deposit"
            width="80%"
          />
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
          <CustomButton title="Spred Coin" width="80%" />
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
          <CustomButton title="Spred Token" width="80%" />
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
          <CustomButton title="Spred Gift Card" width="80%" />
        </View>
      </ScrollView>
      <Modalize
        snapPoint={250}
        onBackButtonPress={() => modalizeRef.current?.close()}
        ref={modalizeRef}
        childrenStyle={{ backgroundColor: '#353535' }}
      >
        {virtualAcctDetails?.staticAccountNumber?.length > 0 ? (
          <View style={{ padding: 20 }}>
            <Text style={styles.label}>Currency</Text>
            <Text style={styles.text}>{virtualAcctDetails?.currency}</Text>

            <Text style={styles.label}>Bank Name</Text>
            <Text style={styles.text}>{virtualAcctDetails?.bankName}</Text>

            <Text style={styles.label}>Account number</Text>
            <View style={styles.accountNumberContainer}>
              <Text style={styles.accountNumber}>
                {virtualAcctDetails?.staticAccountNumber}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  copyAccountNumber(virtualAcctDetails?.staticAccountNumber)
                }
              >
                <Text style={styles.copyButton}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderStartColor: '#353535',
            }}
          >
            <Text style={styles.label}>
              Couldn't retrieve your virtual account details
            </Text>
            {loadingBalance ? (
              <ActivityIndicator size={'small'} color="white" />
            ) : (
              <Text onPress={() => onRefresh()} style={styles.link}>
                Click here to try again
              </Text>
            )}
          </View>
        )}
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    padding: 10,
    flex: 1,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
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
    backgroundColor: '#F3E4DD',
    borderRadius: 10,
    marginVertical: 0,
    padding: 10,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginLeft: 10,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9D9D9D',
  },

  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff',
  },
  link: {
    fontSize: 16,
    marginTop: 5,
    color: 'orange',
  },
  accountNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  copyButton: {
    fontSize: 16,
    color: 'orange',
    marginLeft: 10,
    textDecorationLine: 'underline',
    cursor: 'pointer', // For web-based platforms
  },
});

export default SpredWallet;
