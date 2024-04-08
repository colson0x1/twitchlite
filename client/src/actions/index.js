import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from './types';

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
  // handle on the stream that just got created
  const response = await streams.post('/streams', formValues);

  // The response object we get back from axios has turn of information
  // about the response. But we only care about the information that was
  // returned inside the request. So, returning `response.data`
  dispatch({ type: CREATE_STREAM, payload: response.data });
};
