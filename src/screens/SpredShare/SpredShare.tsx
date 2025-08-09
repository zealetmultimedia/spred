import { Text, View } from 'react-native';

import React, { useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomText from '../../components/CustomText/CustomText';
import { getFileNameFromURL } from '../DownloadItems/DownloadItems';
import RNFS from 'react-native-fs';
import {
  subscribeOnClientUpdated,
  subscribeOnConnectionInfoUpdates,
  WifiP2pInfo,
} from 'p2p-file-transfer';
import { sendFileTo } from '../../../.yalc/p2p-file-transfer';
import { subscribeOnFileSend } from '../../../.yalc/p2p-file-transfer/src';

export default function SpredShare({ url }: Props) {
  const [clients, setClients] = useState<Array<string>>([]);
  const [connection, setConnection] = useState<WifiP2pInfo>();
  const [progress, setProgress] = useState<number>(0);

  const connectionSubscription =
    subscribeOnConnectionInfoUpdates(setConnection);
  const clientsSubscription = subscribeOnClientUpdated(value => {
    setClients(value.clients);
  });

  useEffect(() => {
    return close;
  }, []);

  const showError = (error: any) => {
    console.log(error);
    Snackbar.show({
      text: JSON.stringify(error),
    });
  };

  const sendFile = async () => {
    try {
      const address = connection?.isGroupOwner
        ? clients[0]
        : connection?.groupOwnerAddress?.hostAddress;

      const file = `${
        RNFS.ExternalDirectoryPath
      }/.spredHiddenFolder/${getFileNameFromURL(url)}.mp4`;

      console.log('Sending file', clients, connection, file, address);

      if (address) {
        const progressSub = subscribeOnFileSend(data => {
          setProgress(data.progress);
        });
        const data = await sendFileTo(file, address);
        progressSub.remove();
        Snackbar.show({
          text: 'File sent',
        });
        console.log('File sent', data);
      }
    } catch (err) {
      showError(err);
    }
  };

  const close = () => {
    connectionSubscription.remove();
    clientsSubscription.remove();
  };

  return (
    <View>
      {connection?.groupFormed ? (
        <>
          <CustomButton title="Send File" onPress={sendFile} />
          <Text>{`Send File Progress: ${Math.ceil(progress)}%`}</Text>
        </>
      ) : (
        <CustomText>Waiting for receiver...</CustomText>
      )}
    </View>
  );
}

type Props = {
  url: string;
};
