import { BackHandler, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeIcon from '../../assets/svg-components/home-icon';
import NewRelease from '../../assets/svg-components/new-release';
import Downloads from '../../assets/svg-components/download-icon';
import Spred from '../../assets/svg-components/spred';

import Homepage from '../screens/Homepage/Homepage';
import Download from '../screens/Download/Download';
import SpredProfile from '../screens/SpredProfile/SpredProfile';
import NewReleases from '../screens/NewRelease/NewRelease';
import { useFocusEffect } from '@react-navigation/native';
// import Profile from '../screens/Account/Account';

const BottomTab = () => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#111111',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9e9a9a',
      })}
    >
      <Tabs.Screen
        name="HOME"
        component={Homepage}
        options={{
          tabBarIcon: ({ focused, color, size }) => <HomeIcon />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="NEW RELEASE"
        component={NewReleases}
        options={{
          tabBarIcon: ({ focused, color, size }) => <NewRelease />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="DOWNLOADS"
        component={Download}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Downloads />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="SPRED"
        component={SpredProfile}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Spred />,
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
