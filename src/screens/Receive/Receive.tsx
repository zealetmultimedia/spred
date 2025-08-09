import { View, Image, Text } from 'react-native';
import CustomText from '../../components/CustomText/CustomText';
import React, { useEffect, useState } from 'react';
import {
  connect,
  Device,
  receiveFile,
  subscribeOnConnectionInfoUpdates,
  subscribeOnPeersUpdates,
  WifiP2pInfo,
} from 'p2p-file-transfer';
import CustomButton from '../../components/CustomButton/CustomButton';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { subscribeOnFileReceive } from '../../../.yalc/p2p-file-transfer/src';
import { getAvailablePeers } from '../../../.yalc/p2p-file-transfer';

export default function Receive() {
  const [connection, setConnection] = useState<WifiP2pInfo>();
  const [peers, setPeers] = useState<Array<Device>>([]);
  const [progress, setProgress] = useState<number>(0);

  const connectionSubscription =
    subscribeOnConnectionInfoUpdates(setConnection);
  const peersSubscription = subscribeOnPeersUpdates(value => {
    setPeers(value.devices);
  });

  const showError = (error: any) => {
    console.log(error);
    Snackbar.show({
      text: JSON.stringify(error),
    });
  };

  const connectTo = async (peer: Device) => {
    try {
      await connect(peer.deviceAddress);
    } catch (error) {
      showError(error);
    }
  };

  const startReceivingFile = async () => {
    try {
      const folder = `${RNFS.ExternalDirectoryPath}/.spredHiddenFolder`;

      const progressSub = subscribeOnFileReceive(data => {
        setProgress(data.progress);
      });
      const data = await receiveFile(folder);
      progressSub.remove();
      Snackbar.show({
        text: 'File received',
      });
      console.log('File received', data);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    getAvailablePeers().then(value => {
      setPeers(value.devices);
    });

    return () => {
      connectionSubscription.remove();
      peersSubscription.remove();
    };
  }, []);

  return (
    <View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ marginRight: 10, marginLeft: 14, marginTop: 5 }}
          source={require('../../../assets/spredshare.png')}
        />
      </View>
      {!connection?.groupFormed && (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <CustomText>Available Devices</CustomText>
          </View>
          {peers.map(peer => (
            <View
              key={peer.deviceAddress}
              style={{
                marginTop: 10,
              }}
            >
              <CustomButton
                title={`Connect to ${peer.deviceName}`}
                onPress={() => connectTo(peer)}
              />
            </View>
          ))}
        </>
      )}
      {connection?.groupFormed && (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <CustomButton
            title="Start Receiving File"
            onPress={startReceivingFile}
          />
          <Text>{`Receive File Progress: ${progress}%`}</Text>
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <CustomText>NGN100 will be deducted from your account</CustomText>
      </View>
    </View>
  );
}
