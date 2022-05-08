import { GET_HASHES } from '../types';
import db from '../../services/db';
import CryptoJS from 'crypto-js';
import { primeNumbers } from '../../utils';

export const getHashes = () => (dispatch) => {
  console.log('executed');
  db.transaction((tx) => {
    tx.executeSql(
      'select * from hashes',
      [],
      (_, { rows: { _array } }) => {
        dispatch({
          type: GET_HASHES,
          payload: _array,
        });
      }
    );
  });
};

const hashedText = (text) =>
  CryptoJS.SHA512(text, 'secretKey 123').toString();
console.log('firstly executed');
export const saveHashes = () => (dispatch) => {
  const newHashes = primeNumbers(10).map((item) => ({
    item,
    hash: hashedText(String(item)),
  }));
  newHashes.map((item) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into hashes (item, hash) values (?, ?)',
          [item.item, item.hash]
        );
        tx.executeSql(
          'select * from hashes',
          [],
          (_, { rows: { _array } }) => {
            dispatch({
              type: GET_HASHES,
              payload: _array,
            });
          }
        );
      },

      null,
      null
      // forceUpdate
    );
  });
};
