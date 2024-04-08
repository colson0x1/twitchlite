import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      // `...state` satisfy Redux requirement of always returning a new object
      // Response: We get back single record from the API
      // We wanna take that record and it into our state object
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      // Response: We get back single record from the API
      // We wanna take that record and it into our state object
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      // Response: We get back single record from the API
      // We wanna take that record and it into our state object
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
