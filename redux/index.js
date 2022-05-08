import {
  combineReducers,
  applyMiddleware,
  createStore,
} from 'redux';
import screenSaver from './reducers/screens';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  screenSaver,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
