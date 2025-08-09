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
import RNFS from 'react-native-fs';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import VideoThumbnail, { createThumbnail } from 'react-native-create-thumbnail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ThemeStyles from '../../theme/Fonts';
import CustomText from '../../components/CustomText/CustomText';
import { truncateText } from '../../helpers/utils';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import axios from 'axios';
import { api } from '../../helpers/api/api';
import { getDataJson } from '../../helpers/api/Asyncstorage';

const LeftIcon = () => <AntDesign name="left" size={20} color="#F45305" />;
const SearchIcon = () => <AntDesign name="search1" size={20} color="#FFFFFF" />;
const BinIcon = () => <AntDesign name="delete" size={20} color="#FFFFFF" />;

const DownloadIcon = () => (
  <AntDesign name="download" size={15} color="#F45305" />
);

const Download = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [videoList, setVideoList] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchVideoList();
      fetchRecommended();
    }
  }, [isFocused]);

  const fetchRecommended = async () => {
    try {
      const user = await getDataJson('User');
      const config = {
        headers: {
          mobileAppByPassIVAndKey: 'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
          username: 'SpredMediaAdmin',
          password: 'SpredMediaLoveSpreding@2023',
          Authorization: `Bearer ${user?.token}`,
        },
      };
      let response = await axios.get(api.getAllMovies, config);
      setRecommended(response?.data?.data?.slice(0, 10) || []);
    } catch (error) { }
  };

  const generateThumbnail = async (videoPath: string) => {
    try {
      const thumbnail = await createThumbnail({ url: `file://${videoPath}`, timeStamp: 5000 });
      return thumbnail;
    } catch (error) {
      return null;
    }
  };

  const fetchVideoList = async () => {
    try {
      const folderName = '.spredHiddenFolder';
      const folderPath = `${RNFS.ExternalDirectoryPath}/${folderName}`;
      const files = await RNFS.readDir(folderPath);
      const updatedVideoList = [];
      for (const file of files) {
        const videoName = file.name;
        const videoPath = file.path;
        const thumbnail = await generateThumbnail(videoPath);
        updatedVideoList.push({
          name: videoName,
          thumbnail: thumbnail?.path ?? '',
          size: file.size,
          duration: 'videoDuration',
          path: videoPath,
        });
      }
      setVideoList(updatedVideoList);
    } catch (error) {
      setVideoList([]);
    }
  };

  const renderDownloads = () => {
    return videoList.length === 0 ? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>No Video Downloaded Yet</Text>
      </View>
    ) : (
      videoList.map((movie, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('PlayDownloadedVideos', {
                movie,
              })
            }
          >
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
              <View>
                <Image source={{ uri: `${movie.thumbnail}` }} style={{ width: 80, height: 80, borderRadius: 5 }} />
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <CustomText fontSize={14} fontWeight="700">{truncateText(movie?.name)}</CustomText>
                <CustomText fontSize={14} fontWeight="400">{Math.ceil(movie?.size / 1048576)}Mb</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    );
  };

  const renderRecommended = () => {
    return recommended.map(movie => (
      <View key={movie.key} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <View>
          <Image source={{ uri: movie.thumbnailUrl }} style={{ width: 80, height: 80, borderRadius: 5 }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <CustomText fontSize={14} fontWeight="700">{movie.title}</CustomText>
          <CustomText fontSize={14} fontWeight="400">{movie.duration}</CustomText>
        </View>
        <View>
          <Image source={require('../../../assets/videodownload.png')} />
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#353535', width: '100%', padding: 10 }}>
      <View>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <TouchableOpacity>
              <Text style={styles.downloadsText}>Downloads</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Image style={{ marginRight: 10, marginLeft: 10, width: 30, height: 30, borderRadius: 10 }} source={require('../../../assets/ava.jpg')} />
            <Image source={require('../../../assets/search.png')} />
          </View>
        </View>
        {renderDownloads()}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <CustomText style={{ marginLeft: 12 }} fontSize={15} fontWeight="800">RECOMMENDED DOWNLOADS</CustomText>
          {renderRecommended()}
        </View>
      </View>
    </ScrollView>
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
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Download;
