import React from 'react';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { primeNumbers } from '../utils';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeScreen } from '../redux/actions';

const CryoptoScreen = () => {
  const dispatch = useDispatch();
  const [hashes, setHashes] = React.useState([]);
  primeNumbers(10000);

  const hashedText = (text) =>
    CryptoJS.SHA512(text, 'secretKey 123').toString();

  const loadDbData = async () => {
    try {
      const data = await AsyncStorage.getItem('hashes');
      if (data && data !== undefined)
        return JSON.parse(data);
    } catch (error) {
      // print the error
    }
  };

  const produceHashes = async () => {
    try {
      const newHashes = primeNumbers(10).map((item) => ({
        item,
        hash: hashedText(String(item)),
      }));
      await AsyncStorage.setItem(
        'hashes',
        JSON.stringify(newHashes)
      );
      return newHashes;
    } catch (error) {
      // print the error
    }
  };
  React.useEffect(() => {
    dispatch(changeScreen('Cryptos'));
    (async () => {
      try {
        let data = await loadDbData();
        if (!data) {
          data = await produceHashes();
        }
        setHashes([...data]);
      } catch (error) {
        // print the error
      }
    })();
  }, []);
  return (
    <View>
      <FlatList
        data={hashes}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.item}</Text>
            <Text style={styles.hash}>{item.hash}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default CryoptoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    margin: 6,
    padding: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
