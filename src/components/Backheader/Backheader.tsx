import { View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BackHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '90%', paddingHorizontal: 25 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={18} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
