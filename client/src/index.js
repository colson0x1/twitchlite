import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);

// Start a redux debug session
// A debug session is where redux dev tools is going to automatically save
// all of the data inside of a redux store and persist it across refreshes of
// our application
// Normally when we refresh our application, all the data inside of our redux
// store, falls away. We lose it entirely
// When we enable this debug session, Redux dev tools is going to make sure that
// all the data stays around between refreshes of the page.
// So this is incredebly useful for advanced feature development.
/* localhost:3000?debug_session=<some_string> */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
