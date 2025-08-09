import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dataset from '../../MockData/Dataset';
import CustomText from '../../components/CustomText/CustomText';
const PlayDownloadedVideos = props => {
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [showDownload, setShowDownload] = useState(false);
  const [showSpred, setShowSpred] = useState(false);
  const navigation = useNavigation();

  const handleVideoPress = () => {
    setIsVideoPaused(false);
  };

  const showIsDownload = () => {
    setShowDownload(!showDownload);
  };

  const showIsSpredScreen = () => {
    setShowSpred(!showSpred);
  };

  const RecommendedMovies = Dataset.filter(item => Number(item.key) < 5);

  const GoBackIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={25} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  const SearchIcon = () => {
    return (
      <TouchableOpacity onPress={() => console.log('Search icon pressed')}>
        <AntDesign name="search1" size={25} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#353535', width: '100%' }}>
      <View style={{ backgroundColor: '#353535', width: '100%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 50,
            paddingHorizontal: 20
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../assets/search.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleVideoPress}>
          {isVideoPaused && (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -25 }, { translateY: 10 }],
                zIndex: 1,
              }}
            >
              <TouchableOpacity onPress={handleVideoPress}>
                <Image source={require('../../../assets/Playarrow.png')} />
              </TouchableOpacity>
            </View>
          )}
          <Video
            playInBackground={true}
            source={{ uri: `file://${props.route.params?.movie?.path}` }}
            style={{
              width: '100%',
              height: 221,
              marginTop: 10,
              backgroundColor: 'fff',
            }}
            paused={isVideoPaused}
            controls
            resizeMode="cover"
          />
          {/* </ImageBackground> */}
        </TouchableOpacity>

        <View style={{ height: 171, marginTop: 10 }}>
          <CustomText
            style={{ marginBottom: 10 }}
            fontSize={15}
            fontWeight="800"
            color="white"
            marginLeft={10}
          >
            RECOMMENDATION
          </CustomText>
          <FlatList
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={RecommendedMovies}
            contentContainerStyle={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() =>
                  navigation.navigate('PlayVideos', {
                    item: item,
                  })
                }
              >
                <Image
                  source={item.src}
                  style={{
                    width: 100,
                    height: 170,
                    resizeMode: 'cover',
                    marginHorizontal: 8,
                    marginVertical: 12,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ height: 171, marginTop: 10 }}>
          <CustomText
            style={{ marginBottom: 10 }}
            fontSize={15}
            fontWeight="800"
            color="white"
            marginLeft={10}
          >
            Top rated
          </CustomText>
          <FlatList
            inverted
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={RecommendedMovies}
            contentContainerStyle={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() =>
                  navigation.navigate('PlayVideos', {
                    item: item,
                  })
                }
              >
                <Image
                  source={item.src}
                  style={{
                    width: 100,
                    height: 170,
                    resizeMode: 'cover',
                    marginHorizontal: 8,
                    marginVertical: 12,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayDownloadedVideos;
