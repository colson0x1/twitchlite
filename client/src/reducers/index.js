import { combineReducers } from 'redux';
// renaming reducer to formReducer to prevent confusion because we might have
// lots of reducers inside this file and it might be confusing to know
// what reducer it is
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

/* @ Redux Form
https://redux-form.com/7.4.2/examples/syncvalidation/
*/
export default combineReducers({
  // assigning a key of auth for auth reducer
  auth: authReducer,
  // This is going to be a reducer that is been created for us by the
  // Redux form library
  form: formReducer,
});
