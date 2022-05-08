import { CHANGE_SCREEN, GET_SCREEN } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changeScreen =
  (screenName) => async (dispatch) => {
    try {
      await AsyncStorage.setItem('screenName', screenName);
      dispatch({
        type: CHANGE_SCREEN,
        payload: screenName,
      });
    } catch (error) {
      // Print error
      console.log(error);
    }
  };

export const getScreen = () => async (dispatch) => {
  try {
    const screenName = await AsyncStorage.getItem(
      'screenName'
    );
    dispatch({
      type: GET_SCREEN,
      payload: screenName,
    });
  } catch (error) {
    //
    console.log(error);
  }
};
