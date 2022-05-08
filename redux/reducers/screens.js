import { CHANGE_SCREEN, GET_SCREEN } from '../types';

const INITIAL_STATE = {
  screenName: '',
};

const screenSaver = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {
        screenName: action.payload,
      };
    case GET_SCREEN:
      return {
        screenName: action.payload,
      };
    default:
      return state;
  }
};

export default screenSaver;
