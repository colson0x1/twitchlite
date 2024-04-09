import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

// Using Class based Component because we want to call our action creator
// inside of the componentDidMount() lifecycle method because we only attempt
// to fetch our streams one time.
class StreamList extends React.Component {
  componentDidMount() {
    // Call our action creator and use Redux Dev Tools to the actual list of
    // streams appear inside of our reducer or inside of our Redux State
    this.props.fetchStreams();
  }

  // naming renderAdmin because the two buttons edit and delete on stream list
  // are kind of like administrative buttons. they are administrating over the
  // stream and they allow the user to edit and delete the stream
  // So whenever this renderAdmin function gets called, we're going to pass in
  // the stream, that we're currently interating over.
  // We're going to eventually call renderAdmin from the body of our map function
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <button className='ui button primary'>Edit</button>
          <button className='ui button negative'>Delete</button>
        </div>
      );
    }
  }

  // Take that list of streams and just render them out as a list on the screen
  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    // Test if we received streams successfully
    // console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
      </div>
    );
  }
}

// Get our list of streams available as props inside of our Component
// mapStateToProps is going to receive state as an argument
const mapStateToProps = (state) => {
  // returning an object that has streams property that contains all of the
  // different streams
  // We prolly want to map over this list of streams and render out some
  // li for each element inside there
  // Usually what we do is: Leave the list of streams in this object form
  // inside of our Redux store. We leave them in this object form because
  // it makes us really easy to update, add and delete records when its in
  // object form rather than in array form.
  // But when we eventually take these streams and get them into a Component
  // through mapStateToProps, usually we will turn that object into an
  // actual array.
  // The reason we turn it into an array before it gets into our Component
  // is just to make sure that its really easy to map over and run that
  // map function.
  // And ofcourse we could use mapping function within an object by using
  // lodash but to keep things little bit easy and not have quite such a
  // big dependency on lodash, we usually just turn the thing into an array
  // before it goes into our Component.
  // So to get the list of just the streams out of here (i.e from state object),
  // inside of an array, and not have to worry about the object nature of the
  // thing, we're going to call Object.values() and pass in state.streams like so.
  // So Object.values() is an builtin JavaScript function. Its going to take
  // an object as an argument, all the different values inside of that object
  // are going to be pulled out and then insert it into an array.
  // That's exactly what  Object.values() does. It just turns all the values
  // inside of that object into an array.
  // Now inside of our Component, we're going to have a prop called
  // this.props.streams and that's going to be an array of all of our different
  // streams.
  return {
    streams: Object.values(state.streams),
    // currentUserId is better naming than just userId because it makes it a little
    // bit more obvious that this is the id of the person was currently signed in and
    // using the application.
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
