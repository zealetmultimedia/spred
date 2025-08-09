/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppBar from '../../AppBar/AppBar';
import HomeHeader from '../HomeHeader/HomeHeader';
import axios from 'axios';
import { api } from '../../../src/helpers/api/api';
import { getDataJson, storeDataJson } from '../../../src/helpers/api/Asyncstorage';

const Homepage = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [moviearray, setMovieArray] = useState([]);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState();
  const [cats, setCats] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [category, setCategory] = useState('all');
  const [contentType, setContentType] = useState('all');
  const token = user?.token;
  const id = user?.id;

  useEffect(() => {
    get();
    getStoredUserData();
    getWalletDetails();
    getAllCategories();
  }, [token]);

  const getStoredUserData = async () => {
    const gotten = await getDataJson('User');
    const gotten2 = await getDataJson('UserInfo');
    setUser(gotten);
    setUserInfo(gotten2);
  };

  const config = {
    headers: {
      mobileAppByPassIVAndKey: 'a0092a148a0d69715268df9f5bb63b24fca27d344f54df9b',
      username: 'SpredMediaAdmin',
      password: 'SpredMediaLoveSpreding@2023',
      Authorization: `Bearer ${token}`,
    },
  };

  const getWalletDetails = async () => {
    try {
      let response = await axios.get(`${api.getWalletDetails}/${id && id}`, config);
      storeDataJson('WalletDetails', response?.data?.data);
    } catch (error) { }
  };
  const getAllCategories = async () => {
    try {
      let response = await axios.get(`${api.getAllCategories}`, config);
      setCats(response?.data?.data);
    } catch (error) { }
  };

  const get = async () => {
    try {
      let response = await axios.get(api.getAllMovies, config);
      setMovieArray(response?.data?.data);
    } catch (error) { }
  };

  // Filter for new releases and recommendations
  const newReleases = moviearray
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 10);
  const recommended = moviearray.slice(0, 10);

  return (
    <ScrollView style={{ flexDirection: 'column', backgroundColor: '#353535', flex: 1, paddingTop: 50, paddingBottom: 100 }}>
      <AppBar userInfo={userInfo} />
      <HomeHeader
        onChange={(current, catid) => {
          setCurrentTab(current);
          setContentType(catid);
        }}
        cats={cats}
        currentTab={currentTab}
        changeCat={setCategory}
      />
      {currentTab === 0 ? (
        <View>
          <View style={{ backgroundColor: '#353535', paddingHorizontal: 10 }}>
            <View style={{ height: 20 }} />
            {/* first slider starts here */}
            {newReleases[0] && (
              <TouchableOpacity onPress={() => navigation.navigate('PlayVideos', { item: newReleases[0] })}>
                <View style={{ height: 212, width: '100%', backgroundColor: '#ffffff', borderRadius: 5, zIndex: 1 }}>
                  <Image style={{ resizeMode: 'cover', justifyContent: 'center', height: 212, width: '100%', zIndex: 1 }} source={{ uri: newReleases[0]?.thumbnailUrl }} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 20 }} />
          {/* New Releases */}
          <Text style={{ fontWeight: 700, fontSize: 14, color: '#ffffff', paddingHorizontal: 12, paddingVertical: 10 }}>NEW RELEASES</Text>
          <View style={{ height: 171 }}>
            <FlatList
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              data={newReleases}
              contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PlayVideos', { item })}>
                  <Image source={{ uri: item?.thumbnailUrl }} style={{ width: 100, height: 170, resizeMode: 'cover', marginHorizontal: 8, marginVertical: 12 }} />
                </TouchableOpacity>
              )}
            />
          </View>
          {/* Recommendations */}
          <Text style={{ fontWeight: 700, fontSize: 14, color: '#ffffff', paddingHorizontal: 12, paddingVertical: 10 }}>RECOMMENDATIONS</Text>
          <View style={{ height: 171 }}>
            <FlatList
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              data={recommended}
              contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PlayVideos', { item })}>
                  <Image source={{ uri: item?.thumbnailUrl }} style={{ width: 100, height: 170, resizeMode: 'cover', marginHorizontal: 8, marginVertical: 12 }} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : (
        <VideoType category={category} contentType={contentType} data={moviearray} navigation={navigation} />
      )}
    </ScrollView>
  );
};
const VideoType = ({ contentType, category, data, navigation }) => {
  let todisplay = data;
  if (category === 'all') {
    todisplay = data.filter(
      (item: { contentTypeId: string }) => item?.contentTypeId === contentType,
    );
  } else {
    todisplay = data.filter(
      (item: { categoryId: any; contentTypeId: string }) =>
        item?.contentTypeId === contentType && item?.categoryId === category,
    );
  }

  return (
    <ScrollView
      style={{
        flexDirection: 'column',
        backgroundColor: '#353535',
        flex: 1,
        paddingBottom: 100,
      }}
    >
      <View style={{ height: 20 }} />
      {/* First scroll sectiion starts */}
      <View>
        {todisplay.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>No Item Yet</Text>
          </View>
        ) : (
          <FlatList
            numColumns={3}
            data={todisplay}
            renderItem={({ item }) => {
              // console.log('good boy', item);
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() =>
                    navigation.navigate('PlayVideos', {
                      item: item,
                    })
                  }
                >
                  <Image
                    source={{ uri: item?.thumbnailUrl }}
                    style={{
                      width: 120,
                      height: 170,
                      resizeMode: 'cover',
                      marginHorizontal: 8,
                      marginVertical: 12,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Homepage;

const styles = StyleSheet.create({});
