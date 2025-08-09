import { View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomText from '../components/CustomText/CustomText';

const AppBar = ({userInfo}:{unserInfo: object}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        {/* <Image
          style={{
            width: 24,
            marginRight: 10,
            height: 24,
          }}
          source={require('../../assets/human.png')}
        /> */}
         <Text
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: '#ffffff',
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        >
      Hello {userInfo?.firstName}
        </Text>
        <TouchableOpacity>
        <Image
          style={{
            width: 24,
            marginRight: 10,
            height: 24,
          }}
          source={require('../../assets/Searchbar.png')}
        />
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Image
          style={{
            width: 24,
            marginRight: 10,
            height: 24,
          }}
          source={require('../../assets/DownloadArrow.png')}
        />
        </TouchableOpacity>
        <Image
          style={{
            width: 44,
            marginRight: 10,
            height: 44,
          }}
          source={require('../../assets/PlusIcon.png')}
        />
        <View style={{ flex: 1 }} />
        <Image
          style={{
            width: 91,
            marginRight: 10,
            height: 28,
          }}
          source={require('../../assets/spred.png')}
        /> */}
      </View>
      <View style={{ height: 20 }} />
    </>
  );
};

export default AppBar;
