import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  // assigning a key of auth for auth reducer
  auth: authReducer,
});
