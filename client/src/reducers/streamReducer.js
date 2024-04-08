import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // When we get list of streams from the api, they come back in an array
    // and each stream has an id, title and description property
    case FETCH_STREAMS:
      // mapkeys from lodash is a function that's going to take an array
      // and then return an object. First argument is the object and the second,
      // is the key. The new object that gets created will have that key as the
      // object key and value will be that object:
      // const colors = [{ id: 3 }, { id: 6 }, { id: 9 }];
      // _.mapKeys(colors, 'id')
      // output: { '3': { 'id': 3 }, '6': { 'id': 6}, '9': { 'id': 9 }}
      // action.payload is list of streams that we get back from an API
      // And we create object out of it using mapKeys and the keys inside
      // that object are going to be ids of the individual stream themselves
      // Now the reason we use ... infront of _.mapKeys is,
      // mapKeys returns a big object and we want to take all the key value
      // pairs from that object and add them into the new object that gets
      // created
      return { ...state, ..._.mapKeys(action.payload, 'id') };
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
    case DELETE_STREAM:
      // we do not have to add `action.payload.id` here
      // Because response we get from delte operation is nothing.
      // So when we dispatch an action of type delete stream, the payload is
      // the id itself
      // Nice thing about `omit` method from lodash is, omit is not going to
      // change the original state object. Instead it creates a new object
      // with all the properties from state without whatever we passed in as
      // the action payload.
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
