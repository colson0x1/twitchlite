import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { GOOGLE_CLIENT_ID } from '../config/googleAuthCredential';

class GoogleAuth extends React.Component {
  /* @ Initialize the library */
  // Anytime that our component is rendered onto the screen, we're going to
  // load up the client portion of the library
  // Now when we load up that library, it takes some amount of time for the
  // library to reach over to google servers and download some additional
  // javascript code
  // So we need to essentially get a callback of when that process is complete
  // so to add a callback, we can pass a second argument. this callback arrow
  // function is only going to be called after this client:auth2 library has been
  // successfully loaded up into gapi.
  componentDidMount() {
    // gapi is available on window scope that is available inside of a browser
    // Load addiotional code to the gapi library: load client:auth2
    window.gapi.load('client:auth2', () => {
      // client.init executes a asynchronous network request over to google api
      // server inorder to initialize our client
      // so we want to get some type of callback function or some time of notice
      // for when that initialization setup is all done
      // so to do so we are going to chain on a .then() statement
      // The reason we have to use .then() is:
      // When we call load('client:auth') there, load only allows us to get a
      // signal or a notification of when the loading process is complete by
      // passing in a callback function
      // But when we call init here, we do not have to use a callback function
      // When we call init, it returns a Promise. So by chaining a .then(),
      // this arrow function inside .then() is going to be automatically invoked
      // after a library has successfully initialize itself.
      // So inside of .then(), we can write some amount of code that will be
      // only executed once our entire gapi library is ready to go!
      window.gapi.client
        .init({
          // initialize authentication client with clientId
          clientId: GOOGLE_CLIENT_ID,
          // ask for the scope of email
          scope: 'email',
          // in order to use the Google Platform API, we have to pass a plugin_name
          // as a parameter to the init method. The value is just an arbitrary name
          // and can be anything we wish
          plugin_name: 'twitchlite',
        })
        .then(() => {
          // So at this point in time, we can start to figure out whether or not
          // the user is currently signedin and then attempt to print out that
          // status the screen.
          this.auth = window.gapi.auth2.getAuthInstance();

          // update auth state inside of our redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          // .get and .listen exists on the prototype of the auth object
          // sit around and wait for that authentication status to change it
          // at some point in the future
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // This onAuthChange function right here, actually gets called with a boolean
  // argument of either true or false to indicate whether or not the user is
  // signed in.
  // So we don't actually have to reach back into the auth instance and call the
  // isSignedIn.get i.e `this.auth.isSignedIn.get()`
  // We can instead receive it as an argument
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // signIn action creator with Google id of the user thats signed in
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      // signOut action creator
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
