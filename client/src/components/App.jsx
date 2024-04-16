import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
          {/* Switch right here is going to look at all this different routes and
          its only going to show one of these given routes for any path that we
          go to. So the first route inside of here that gets matched by given 
          path is going to be shown and nothing else. So now whenever we go to 
          /streams/new this route will be shown and React Router DOM is going to
          say okay I found a route right here to show and I'm not gonna show
          any other potential route. So even though technically /streams/:id
          will match /streams/new because :something is just variable in url params, 
          it will not be shown because its now wrapped inside of Switch. */}

          {/* So remember anytime it feels like React Router DOM is showing a  
          component that it shouldn't show. Chances are we got one of these little
          query parameters on here llike /:id and that's probably what is throwing
          off our route matching. */}

          <Switch>
            {' '}
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/new' exact component={StreamCreate} />
            <Route path='/streams/edit/:id' exact component={StreamEdit} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/:id' exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
