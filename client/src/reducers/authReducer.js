import { SIGN_IN, SIGN_OUT } from '../actions/types';

// export default (state = {}, action) => {}
// Using empty object as the initial state instead of default values like
// true, false or null because in truth, we will have one other property
// related to authentication.
// Easy way to arrange all this data is using an object.
// Now this object right here, we expect to eventually have some property
// inside of it called something like isSignedIn
// And we probably want to start off that property being set to null
// So in order to default the argument of state in this case, in order to
// initialize it, we'll add a initializer

// Making variable name that is all capatalized to make sure that its really
// clear to other Engineers that this is supposed to be a true constant object
// and we should never change any of the values inside of it
// i.e We capitalize to say that DO NOT TRY TO MODIFY this object under
// any circumstance whatsoever.
const INITIAL_STATE = {
  isSignedIn: null,
};

// The idea here with the default argument here is, when our
// Redux application first boots up, our reducer gets called one time to
// initialize it.
// If this reducer gets called with first argument value of
// undefined, then state will be set equal to whatever we put right here on
// INITIAL_STATE
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
