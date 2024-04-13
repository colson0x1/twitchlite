import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

// With React Router, each component needs to be designed to work by itself or
// in isolation (fetch its own data!)
// Essentially that means that every component that React Router DOM is gonna show
// needs to fetch its own data
// We really cannot assume that any given component will get access to some
// data that might have been loaded up previously inside of our application
// If a user navigates directly to /streams/edit/streamId like 3, there are no
// stream to select from
// So our stream edit component needs to load up appropriate stream
// It needs to call the action creator to react out to the api and fetch the
// stream with id say 3 so then it can show it on the screen
// Thats' the big lesson here.
// WE just need to make sure every component is not going to have some dependency
// on a user visiting some other route inside of our application ahead of time
// Like if the user bookmarks /streams/edit/3 page then that would completely
// bypass the stream list component. In addition, a user might copy that same
// link /streams/edit/3 right here and share with a friend. the friend click
// the url, come to this page and expects to see the appropriate stream up here.
// So its entirely possible that our users are always going to come directly
// to a given route inside of our application so every route and every component
// shown by that route needs to fetch its own data and it cannot rely upon some
// other component fetching data ahead of time for it.

// We have now access to some props specifically because, the StreamEdit
// component inside of our App Component is being rendered by a Route Component
// Because StreamEdit is rendered by Route, React Router DOM automatically is
// going to add in a bunch of different props to StreamEdit when it gets
// rendered onto the screen
// Those props are history, location, and match
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    // console.log(this.props);

    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return <div>{this.props.stream.title}</div>;
  }
}

// Our component knows about the id of the stream that we're trying to show
// on the screen but we don't want to have access to that id inside of our
// Component. We wanna have acces to it inside of mapStateToProps.
// mapStateToProps get a second argument called ownProps and ownProps is the
// same props object that ends up inside of our component.
// So inside of ownProps is all the same informatoin we're looking at
// like history, location, match
const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;

  // Now we can look through our state object. we can look out our list of
  // streams or the objects with all of our streams and pull out just the
  // stream that we care about and return it inside of an object
  return { stream: state.streams[streamId] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
