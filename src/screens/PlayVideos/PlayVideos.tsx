import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton/CustomButton';
import DownloadItems from '../DownloadItems/DownloadItems';
import Spred from '../Spred/Spred';
import CustomText from '../../components/CustomText/CustomText';
import { getDataJson, storeDataJson } from '../../../src/helpers/api/Asyncstorage';
import axios from 'axios';
import { api } from '../../../src/helpers/api/api';
import { customHeaders } from '../../../src/helpers/api/apiConfig';

const PlayVideos = props => {
  const { item } = props.route.params;
  const { title, description, genreId, releaseDate, trailerKey, thumbnailUrl, key, src, type, year, duration, language, cast, director } = item;
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [showDownload, setShowDownload] = useState(false);
  const [showSpred, setShowSpred] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideoUrl();
    fetchAllVideos();
    fetchWatchLater();
  }, [trailerKey]);

  const fetchVideoUrl = async () => {
    setVideoLoading(true);
    try {
      const user = await getDataJson('User');
      const payload = {
        bucketName: 'spredmedia-video-content',
        key: trailerKey,
        amount: 0,
        narration: '',
        currency: '',
        debit_currency: '',
        debit_subaccount: '',
        pin: '',
        userId: user?.id || '',
      };
      const response = await axios.post(api.downloadDebitWallet, payload, { headers: customHeaders(user?.token) });
      setVideoUrl(response?.data?.data?.url || response?.data?.data || null);
    } catch (err) {
      setVideoUrl(null);
    } finally {
      setVideoLoading(false);
    }
  };

  const fetchAllVideos = async () => {
    try {
      const user = await getDataJson('User');
      const config = { headers: customHeaders(user?.token) };
      let response = await axios.get(api.getAllMovies, config);
      setAllVideos(response?.data?.data);
    } catch (err) { }
  };

  const fetchWatchLater = async () => {
    const data = await getDataJson('WatchLater');
    setWatchLater(data || []);
  };

  const handleAddWatchLater = async () => {
    let updated = [...watchLater];
    if (!updated.find(v => v.key === key)) {
      updated.push(item);
      await storeDataJson('WatchLater', updated);
      setWatchLater(updated);
      Alert.alert('Added to Watch Later');
    } else {
      Alert.alert('Already in Watch Later');
    }
  };

  // Recommendations: filter out current video
  const RecommendedMovies = allVideos.filter(v => v.key !== key).slice(0, 10);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#353535', width: '100%' }}>
      <View style={{ backgroundColor: '#353535', width: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../assets/search.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsVideoPaused(false)}>
          {videoLoading ? (
            <View style={{ width: '100%', height: 221, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : videoUrl ? (
            <Video playInBackground={true} source={{ uri: videoUrl }} style={{ width: '100%', height: 221, marginTop: 10, backgroundColor: 'fff' }} paused={isVideoPaused} controls resizeMode="cover" />
          ) : (
            <View style={{ width: '100%', height: 221, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Video unavailable</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={{ marginLeft: 15, marginTop: 5 }}>
          <CustomText style={{ marginTop: 5 }} fontSize={20} fontWeight="800">{title}</CustomText>
          <CustomText fontSize={12} fontWeight="800">{genreId}</CustomText>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <CustomText fontSize={12} fontWeight="400">year</CustomText>
            <CustomText fontSize={12} fontWeight="400" marginLeft={5}>{duration}</CustomText>
          </View>
        </View>
        {showDownload ? (
          <DownloadItems url={trailerKey} />
        ) : showSpred ? (
          <Spred url={trailerKey} />
        ) : (
          <>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/videoplay.png')} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginTop: 25 }}>TRAILER</Text>
              </View>
              <TouchableOpacity onPress={() => setShowDownload(!showDownload)} style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/videodownload.png')} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginTop: 25 }}>DOWNLOAD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddWatchLater} style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/videoadd.png')} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginTop: 25 }}>WATCH LATER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 5, marginTop: -35, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/Screenshare.png')} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginTop: 8 }}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 12, marginLeft: 10 }}>
              <CustomButton image={require('../../../assets/whitespred.png')} title="Spred" width="98%" borderRadius={7} height={45} onPress={() => setShowSpred(!showSpred)} />
              <View style={{ height: 1, backgroundColor: '#3F3F3F', marginVertical: 10, width: '100%' }} />
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
                    <Image source={require('../../../assets/Accountcircle.png')} style={{ width: '100%', height: '100%' }} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <CustomText fontSize={14} fontWeight="800">Corporate World Entertainment</CustomText>
                    <CustomText fontSize={10} fontWeight="400" lineHeight={10}>2000000 Subscribers</CustomText>
                  </View>
                </View>
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity>
                    <Text style={{ color: '#F45303' }}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <CustomText fontSize={12} fontWeight="500" lineHeight={14} color="white">{description}</CustomText>
              </View>
              <View style={{ marginTop: 15 }}>
                <CustomText fontSize={10} fontWeight="400" lineHeight={11.5} color="#E0E0E0">Language English</CustomText>
                <CustomText fontSize={10} fontWeight="400" lineHeight={13.5} color="#E0E0E0">Genre: {genreId}</CustomText>
                <CustomText style={{ marginTop: 15 }} fontSize={10} fontWeight="400" lineHeight={11.5} color="#E0E0E0" marginRight={10}>Director: {director}</CustomText>
              </View>
            </View>
            <View style={{ height: 171, marginTop: 10 }}>
              <CustomText style={{ marginBottom: 10 }} fontSize={15} fontWeight="800" color="white" marginLeft={10}>RECOMMENDATION</CustomText>
              <FlatList
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={RecommendedMovies}
                contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PlayVideos', { item })}>
                    <Image source={{ uri: item?.thumbnailUrl }} style={{ width: 100, height: 170, resizeMode: 'cover', marginHorizontal: 8, marginVertical: 12 }} />
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default PlayVideos;
