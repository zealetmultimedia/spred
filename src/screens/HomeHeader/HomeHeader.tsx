import { View, Text, TouchableOpacity } from 'react-native';
import Home from '../../../assets/svg-components/home';
import Slide from '../../../assets/svg-components/slide';

const HomeHeader = ({ cats, onChange, currentTab, changeCat }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => onChange(0, '')}>
          <Home />
        </TouchableOpacity>
        {currentTab === 0 && (
          <View
            style={{
              width: 24,
              height: 3,
              backgroundColor: '#ffffff',
              marginTop: 5,
            }}
          />
        )}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => onChange(1, '6538e041681695c4bba653ee')}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>
            ORIGINAL
          </Text>
          {currentTab === 1 && (
            <View
              style={{
                width: 30,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 5,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(2, '6538e094681695c4bba653f2')}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>
            MOVIES
          </Text>
          {currentTab === 2 && (
            <View
              style={{
                width: 30,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 5,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(3, '6538e08c681695c4bba653f1')}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>
            SERIES
          </Text>
          {currentTab === 3 && (
            <View
              style={{
                width: 30,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 5,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(4, '6538e084681695c4bba653f0')}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>
            SKIT
          </Text>
          {currentTab === 4 && (
            <View
              style={{
                width: 30,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 5,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <Slide changeCat={changeCat} cats={cats} />
    </View>
  );
};

export default HomeHeader;
