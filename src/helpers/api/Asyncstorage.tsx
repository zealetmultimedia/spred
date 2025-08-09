/* Librarys*/
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const getData = async key => {
  try {
    let data = await AsyncStorage.getItem(key);
    return key !== null ? data : null;
  } catch (error) {
    console.error(error);
  }
};

/* STORE JSON */
export async function storeDataJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data stored successfully');
  } catch (err) {
    console.log('Error storing data: ', err);
    throw err;
  }
}

//Get Json data
export async function getDataJson(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('Data not found for key: ', key);
    }
  } catch (err) {
    console.log('Error retrieving data: ', err);
    throw err;
  }
}
