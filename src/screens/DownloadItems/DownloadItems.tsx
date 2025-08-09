import { View, ActivityIndicator, Text } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomText from '../../components/CustomText/CustomText';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import ProgressBar from 'react-native-progress/Bar';
import FileViewer from 'react-native-file-viewer';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import {
  getDataJson,
  storeDataJson,
} from '../../../src/helpers/api/Asyncstorage';
import { customHeaders } from '../../../src/helpers/api/apiConfig';
import axios from 'axios';
import { api } from '../../../src/helpers/api/api';

const DownloadItems = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState(false);
  const [mainloading, setMainLoading] = useState(false);
  const [wallet, setWallet] = useState();
  const [user, setUser] = useState({ token: '' });
  const [progress, setProgress] = useState(0);
  const [getBalnace, setGetBalance] = useState<{
    currency?: string;
    available_balance?: number;
    ledger_balance?: number;
  }>({ currency: '', available_balance: 0, ledger_balance: 0 });

  useEffect(() => {
    async function load() {
      console.log(url, 'download url');
      setMainLoading(true);
      await getStoredWalletDetails();
      await getStoredUserData();
      setMainLoading(false);
    }

    load();
  }, []);
  let payload = {
    bucketName: 'spredmedia-video-content',
    key: 'dummyVideoKey',
    amount: 120,
    narration: 'downloading the dummy data',
    currency: 'NGN',
    debit_currency: 'NGN',
    debit_subaccount: wallet?.account_Reference,
    userId: user?.id,
    pin: '0000',
  };

  const config = {
    headers: {
      mobileAppByPassIVAndKey:
        'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
      username: 'SpredMediaAdmin',
      password: 'SpredMediaLoveSpreding@2023',
      Authorization: `Bearer ${user?.token}`, // Add the Authorization header with the token
    },
  };

  const getStoredUserData = async () => {
    const gotten = await getDataJson('User');
    console.log('This is the user details', gotten);
    setUser(gotten);
  };

  //get wallet details
  const getStoredWalletDetails = async () => {
    const gotten = await getDataJson('WalletDetails');
    console.log('This is Wallet details onPV', gotten);
    setWallet(gotten);

    let response = await axios.get(
      `${api.fecthAccountBalance}/${gotten?.account_Reference}?currency=NGN`,
      config,
    );
    console.log('wallet account balance', response);
    setGetBalance(response?.data?.data);
  };

  //initiate debit
  const DownloadDebit = async () => {
    // console.log('debit payload to be sent', payload);
    // try {
    //   let response = await axios.post(api.downloadDebitWallet, payload, {
    //     headers: customHeaders(user?.token),
    //   });
    //   console.log(response, 'good');
    //   setLoading(false);
    //   console.log('debit successful');
    //   // storeDataJson('User', response?.data?.data)
    // } catch (error) {
    //   console.log('debit wallet error', error);
    // }
  };

  const saveToPrivateFolder = async (url: string, callback?: any) => {
    if (getBalnace?.available_balance < 100) {
      Alert.alert(
        'Insufficient Balance',
        'You need at least NGN100 in your wallet balance',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Okay',
            // onPress: () => {
            //   Linking.openSettings();
            // },
          },
        ],
      );
      return;
    }
    if (Platform.OS === 'android') {
      try {
        const writePermission =
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const readPermission =
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const writeGranted = await PermissionsAndroid.check(writePermission);
        const readGranted = await PermissionsAndroid.check(readPermission);
        console.log('granted', writePermission, writeGranted, readGranted);

        if (!writeGranted) {
          const granted = await PermissionsAndroid.request(writePermission);

          // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (true) {
            // await DownloadDebit();
            setLoading(true);
            console.log('Storage permissions granted');
            // Proceed with file operations
            const fileNameFromURL = getFileNameFromURL(url);
            const fileExtension = 'mp4'; // Set the video file extension

            const folderName = '.spredHiddenFolder';
            const folderPath = `${RNFS.ExternalDirectoryPath}/${folderName}`;
            const filePath = `${folderPath}/${fileNameFromURL}.${fileExtension}`;

            const exists = await RNFS.exists(folderPath);
            if (!exists) {
              await RNFS.mkdir(folderPath);
            }

            const res = await RNFS.downloadFile({
              fromUrl: encodeURI(url),
              toFile: filePath,
              progressDivider: 1,
              begin: () => {
                setProgress(0);
              },
              progress: rs => {
                const newProgress = rs.bytesWritten / rs.contentLength;
                setProgress(newProgress);
              },
            }).promise;

            // Now filePath contains the path to the downloaded video in your app's private folder
            callback?.();
            setLoading(false);
            console.log(filePath);
            console.log('dowlaod', res);
            Alert.alert(
              'Success',
              ' Video saved to device',
              [
                {
                  text: 'Okay',
                  // onPress: () => openVideoFile(filePath),
                },
              ],
              { cancelable: false },
            );
          } else {
            console.log('Storage permissions denied on else');
            // Handle denial
            Alert.alert(
              'Permission Denied',
              'Cannot save video without permission',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
            );
          }
        } else {
          console.log('Both read and write permissions already granted');
          // Proceed with file operations
          setLoading(true);
          // let response = await axios.post(api.downloadDebitWallet, payload, {
          //   headers: customHeaders,
          // });
          // console.log(response, 'good debit');

          const fileNameFromURL = getFileNameFromURL(url);
          const fileExtension = 'mp4'; // Set the video file extension

          const folderName = '.spredHiddenFolder';
          const folderPath = `${RNFS.ExternalDirectoryPath}/${folderName}`;
          const filePath = `${folderPath}/${fileNameFromURL}.${fileExtension}`;

          const exists = await RNFS.exists(folderPath);
          if (!exists) {
            await RNFS.mkdir(folderPath);
          }

          const res = await RNFS.downloadFile({
            fromUrl: encodeURI(url),
            toFile: filePath,
            progressDivider: 1,
            begin: () => {
              setProgress(0);
            },
            progress: rs => {
              const newProgress = rs.bytesWritten / rs.contentLength;
              setProgress(newProgress);
            },
          }).promise;

          // Now filePath contains the path to the downloaded video in your app's private folder
          callback?.();
          setLoading(false);
          console.log(filePath);
          console.log('dowlaod', res);
          Alert.alert(
            'Success',
            ' Video saved to device',
            [
              {
                text: 'Okay',
                // onPress: () => openVideoFile(filePath),
              },
            ],
            { cancelable: false },
          );
        }
      } catch (err) {
        console.warn(err);
        setLoading(false);
        Alert.alert('Error', `Failed to save video\n\n${err}`);
      }
    } else {
      try {
        // DownloadDebit()
        setLoading(true);

        const fileNameFromURL = getFileNameFromURL(url);
        const fileExtension = 'mp4'; // Set the video file extension

        const folderName = '.spredHiddenFolder';
        const folderPath = `${RNFS.ExternalDirectoryPath}/${folderName}`;
        const filePath = `${folderPath}/${fileNameFromURL}.${fileExtension}`;

        const exists = await RNFS.exists(folderPath);
        if (!exists) {
          await RNFS.mkdir(folderPath);
        }

        const res = await RNFS.downloadFile({
          fromUrl: encodeURI(url),
          toFile: filePath,
          progressDivider: 1,
          begin: () => {
            setProgress(0);
          },
          progress: rs => {
            const newProgress = rs.bytesWritten / rs.contentLength;
            setProgress(newProgress);
          },
        }).promise;

        // Now filePath contains the path to the downloaded video in your app's private folder
        callback?.();
        setLoading(false);
        console.log(filePath);
        console.log('dowlaod', res);
        Alert.alert(
          'Success',
          ' Video saved to device',
          [
            {
              text: 'Okay',
              // onPress: () => openVideoFile(filePath),
            },
          ],
          { cancelable: false },
        );
      } catch (error) {
        console.warn(error);
        setLoading(false);
        Alert.alert('Error', `Failed to save video\n\n${err?.response}`);
      }
    }
  };

  const openVideoFile = async (path: any) => {
    const filePath = path;

    try {
      const fileExists = await RNFS.exists(filePath);

      if (fileExists) {
        // Open the video file with the default app on the device
        await Linking.openURL(`${filePath}`);
      } else {
        console.error('Video file not found.');
      }
    } catch (error) {
      console.error('Error opening video file:', error);
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 130 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <CustomText fontSize={15} fontWeight="700">
            Download Video
          </CustomText>
        </View>
        <View>
          <CustomText color="white" fontWeight="600" fontSize={10}>
            Available Space 23.32GB
          </CustomText>
          <CustomText color="#F45305" lineHeight={10} fontSize={9}>
            Buy more space
          </CustomText>
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <View
          style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <View>
          <CustomButton
            image={require('../../../assets/Checkmark.png')}
            title="Standard Quality (243MB)   NGN100"
            width="98%"
            height={40}
            borderRadius={7}
          />
        </View>
        {/* <View style={{ paddingTop: 10 }}>
          <CustomButton
            image={require('../../../assets/Checkmark.png')}
            title="High Quality (563MB)          NGN200"
            width="98%"
            height={40}
            borderRadius={7}
            backgroundColor="#6A6A6A"
          />
        </View> */}
      </View>
      <View style={{ paddingTop: 20 }}>
        <View
          style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        {mainloading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ProgressBar progress={progress} width={200} color="white" />
            <Text style={{ color: '#fff', fontSize: 14 }}>Downloading...</Text>
          </View>
        ) : (
          <CustomButton
            title="Download"
            width="98%"
            borderRadius={7}
            onPress={() => saveToPrivateFolder(url)}
          />
        )}
      </View>
    </View>
  );
};

export default DownloadItems;

const requestPermissionIfNeeded = async () => {
  if (Platform.OS === 'android') {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (!hasPermission) {
      try {
        const status = await PermissionsAndroid.request(permission);
        if (status !== PermissionsAndroid.RESULTS.GRANTED) {
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  }
  return true;
};

export const getFileNameFromURL = (url: string) => {
  // Extract the filename from the URL or use a unique identifier if needed
  const urlParts = url?.split('/');
  const fileName = urlParts[urlParts.length - 1]; // Get the last part of the URL (likely the filename)
  // Optionally, remove any query parameters or extensions from the filename
  const fileNameWithoutParams = fileName?.split('?')[0]; // Remove query parameters
  const fileNameWithoutExtension = fileNameWithoutParams?.split('.')[0]; // Remove file extension (if needed)

  return fileNameWithoutExtension; // Return the extracted filename
};
