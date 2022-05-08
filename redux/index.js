import {
  combineReducers,
  applyMiddleware,
  createStore,
} from 'redux';
import screenSaver from './reducers/screens';
import hashes from './reducers/hashes';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  screenSaver,
  hashes,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
