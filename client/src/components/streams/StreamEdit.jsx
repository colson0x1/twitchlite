import React from 'react';
import { connect } from 'react-redux';

// We have now access to some props specifically because, the StreamEdit
// component inside of our App Component is being rendered by a Route Component
// Because StreamEdit is rendered by Route, React Router DOM automatically is
// going to add in a bunch of different props to StreamEdit when it gets
// rendered onto the screen
// Those props are history, location, and match
const StreamEdit = (props) => {
  console.log(props);
  return <div>StreamEdit</div>;
};

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

export default connect(mapStateToProps)(StreamEdit);
