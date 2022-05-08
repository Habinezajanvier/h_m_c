import { GET_HASHES } from '../types';

const INITIAL_STATE = {
  hashes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HASHES:
      return {
        hashes: action.payload,
      };

    default:
      return state;
  }
};
