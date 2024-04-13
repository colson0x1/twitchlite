import streams from '../apis/streams';
import history from '../history';
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
// When we return a function from action creator, the function gets called
// automatically by Redux Thunk with two arguments:
// The first argument is the dispatch function but it also gets called with a
// second argument as well. And that second argument is the getState function.
// The getState function allows us to reach into the Redux Store and pull out
// some piece of information.
// In this case, its going to allows us to pull out the userId from auth state

// Now we got history object, which means we can trigger direct navigation or
// programmatic navigation from our createStream action creator
export const createStream = (formValues) => async (dispatch, getState) => {
  // getState is giong to return an entire state object
  // here we're accessing that auth piece of state on there and just pluck
  // out the userId
  // If we don't remember structure of our Redux store, we can go to the
  // Redux Dev Tools and click on the little state button and we'll see
  // all of our state!
  const { userId } = getState().auth;
  // handle on the stream that just got created
  // take all the key value pairs out of formValues and add it to that object
  // using spread, and then we're also going to add in userId like so
  // So now when we post a new stream to our api, we're goint to posting up
  // all the values that out of our form along with the id of the user who
  // just created that stream as well.
  const response = await streams.post('/streams', { ...formValues, userId });

  // The response object we get back from axios has turn of information
  // about the response. But we only care about the information that was
  // returned inside the request. So, returning `response.data`
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // Programatically navigate the user back to the root route
  // push() is how we navigate the user around. it takes the string of the
  // path that we want user to go to
  history.push('/');
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
  // When we submit the form, the expection is that we're going to make a
  // request and then hopefully give our users some feedback. Essentially
  // tell them that something has changed or maybe transition them or navigate
  // them to some other page inside of our application
  // So like with create stream action creator, we're going to do the same thing here on
  // edit stream i.e after we make the request and dispatch an action,
  // we're then going to
  // forciably navigate our user back to the root route of our application i.e
  // main list of streams
  history.push('/');
};

// Delete a stream
export const deleteStream = (id) => async (dispatch) => {
  // response is going to be empty on this case since its a delete request
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
