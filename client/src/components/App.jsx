import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className='ui container'>
      {/* Anytime we pass in a prop called history, the router is going to attempt
      to use it instead of its default implementation which is to create its own
      internal history object */}
      {/* We get error if we pass history object:
      The essentially says, I'm a BrowserRouter, I create my own history object.
      You can't tell me what hsitory to use. That's the warning message we see!
      We need to import plain Router and we'll pass our history object into the
      plain router. */}
      <Router history={history}>
        <div>
          <Header />
          {/* Using `exact` so that we don't accidentally match other routes */}
          <Route path='/' exact component={StreamList} />
          <Route path='/streams/new' exact component={StreamCreate} />
          <Route path='/streams/edit/:id' exact component={StreamEdit} />
          <Route path='/streams/delete' exact component={StreamDelete} />
          <Route path='/streams/show' exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
