/* @ Array based approach */
const streamReducer = (state = [], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map((stream) => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
};

/* @ Object based approach */
// With object based reducer, we will have to write dramatically less code!
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      /*
      // * As per the source code of Redux, if we do not return a brand new object,
      // * Redux is going to assume that we did not update anything from our
      // * reducer.
      // * 
      // create a new object
      const newState = { ...state };
      // update appropriate key value pair inside of it
      // keys will be the id of the stream and the value will be the stream itself
      // action.payload is the stream and stream object contains the id of the stream
      // as it was assigned by our API (JSON Server)
      // This is going to access our state object specifically at some given id
      // and we're going to set that to our new stream.
      newState[action.payload.id] = action.payload;
      return newState;
    */
      // Alternate approach that's going to do the same thing but in single
      // line using ES 2015
      //
      // @ Using key interpolation
      // [action.payload.id]: action.payload
      //
      // Here using key interpolation, which essentially means, we don't know
      // exactly what key we want to add to the object. We know that, the
      // action.payload.id property is the key we want to add but we want to
      // somehow add in that key like when this code runs. We don't know what
      // the key is ahead of time. In other words, we can't hardcode the key like
      // 9: action.payload
      // Because we don't know what the id of the stream is going to be!
      // So by using this syntax, we're saying,  look at the action.payload.id
      // property, look at that id, whatever the id is, whatever the number or
      // string or value it is, take that and create a new key using it inside
      // of this overall object and to that key, assign action.payload
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

/* Key interpolation example */
// Dynamically add in new key value pairs to an object!!
// Browser console code
const animalSounds = {cat: 'meow', dog: 'bark' };
const animal = 'lion';
const sound = 'roar';
// This is going to say, take whatever string animal references above and
// add it as a new key to this object and for the value use the sound variable
> { ...animalSounds, [animal]: sound }
// Output
> { cat: 'meow', dog: 'bark', lion: 'roar' } 

