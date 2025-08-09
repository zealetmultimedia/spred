import * as React from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  Menu,
  Divider,
  PaperProvider,
  Portal,
  ActivityIndicator,
  Icon,
} from 'react-native-paper';
import { api } from 'Spre_Mobile_App/src/helpers/api/api';
import { getDataJson } from 'Spre_Mobile_App/src/helpers/api/Asyncstorage';
import axios from 'axios';
const SvgComponent = ({ cats, changeCat }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      {open ? (
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <AntDesign name="up" size={18} style={{ color: 'white' }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <AntDesign name="down" size={18} style={{ color: 'white' }} />
        </TouchableOpacity>
      )}
      <Portal>
        {open && (
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
              elevation: 99999,
              backgroundColor: 'black',
              width: '100%',
              opacity: 0.75,
              padding: 15,
            }}
          >
            <ScrollView style={{ maxHeight: '90%' }}>
              <AntDesign
                size={20}
                name="close"
                color={'white'}
                onPress={() => setOpen(!open)}
              />
              <View>
                <TouchableOpacity
                  key={'all'}
                  onPress={() => {
                    changeCat('all');
                    setOpen(false);
                  }}
                >
                  <Text style={{ color: 'white' }}>All</Text>
                </TouchableOpacity>
                {cats.map(val => {
                  return (
                    <TouchableOpacity
                      key={val._ID}
                      onPress={() => {
                        changeCat(val._ID);
                        setOpen(false);
                      }}
                    >
                      <Text style={{ color: 'white' }}>{val.name}</Text>
                    </TouchableOpacity>
                  );
                })}
                <Text style={{ paddingBottom: 90 }}></Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Portal>
    </View>
  );
};

export default SvgComponent;
