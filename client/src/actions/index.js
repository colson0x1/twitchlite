import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// This is going to be called with list of all those different values that
// we entered into our stream create form as an argument
export const createStream = (formValues) => async (dispatch) => {
  streams.post('/streams', formValues);
};
