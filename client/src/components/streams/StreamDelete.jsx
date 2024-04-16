import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  // Add lifecycle method that will attempt to call the action creator to go
  // and fetch the stream that we're trying to delete. Because we cannot
  // assume that the stream has already been loaded up.
  // We have to make sure that every Component that gets rendered by ReactDOM
  // attempts to fetch its own data!
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      // The only time we're going to use React.Fragment instead of <></>
      // is that, there is some tooling out there like some linter, some
      // code quality checkers that do  not think that empty tags like that
      // are a valid syntax.
      // So some code quality checkers that we might be running even inside of our
      // own code editor will think that  this is invalid JSX and throw an error
      // and warns, hey this is not valid, you're doing something wrong here.
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

// the reason we want ownProps is so that we can look on match prop and pull
// out the id of the stream that we are supposed to be showing on this page
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete,
);
