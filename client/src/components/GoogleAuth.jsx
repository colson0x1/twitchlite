import React from 'react';

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
      window.gapi.client.init({
        // initialize authentication client with clientId
        clientId: 'clientid',
        // ask for the scope of email
        scope: 'email',
        // in order to use the Google Platform API, we have to pass a plugin_name
        // as a parameter to the init method. The value is just an arbitrary name
        // and can be anything we wish
        plugin_name: 'twitchlite',
      });
    });
  }

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;
