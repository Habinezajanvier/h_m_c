import React from 'react';
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { primeNumbers } from '../utils';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  changeScreen,
  getHashes,
  saveHashes,
} from '../redux/actions';

const CryoptoScreen = () => {
  const dispatch = useDispatch();
  const [hashes, setHashes] = React.useState([]);
  const { hashes: newHashes } = useSelector(
    (state) => state.hashes
  );

  React.useEffect(() => {
    dispatch(changeScreen('Cryptos'));
    newHashes.length
      ? dispatch(getHashes())
      : dispatch(saveHashes());
    setHashes([...newHashes]);
  }, []);

  React.useEffect(() => {
    setHashes([...newHashes]);
  }, [newHashes]);
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
