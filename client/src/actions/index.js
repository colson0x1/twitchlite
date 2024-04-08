import streams from '../apis/streams';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

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

// List all records i.e streams
export const fetchStreams = () => async (dispatch) => {
  // Using axios instance
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Get one particular stream
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Update a stream
export const editStream = (id, formValues) => async (dispatch) => {
  // pass id + make sure we communicate the update that we want to make
  // on the body of the request
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

// Delete a stream
export const deleteStream = (id) => async (dispatch) => {
  // response is going to be empty on this case since its a delete request
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
