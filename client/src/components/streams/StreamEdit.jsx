import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    // console.log(this.props);

    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* initialValues is a very special property name with Redux Form */}
        {/* StreamForm component is wrapped by Redux Form */}

        {/* StreamForm is technically rendered or wrapped by the Redux Form Helper
          so that redux form helper sees this prop of initial values. It sees that
          it is an object with the title and a description property. And so when 
          the Stream form is rendered, we have a field with a title and a field
          with a description and so those initial values are used as the initial
          values for field number and field number two.
        */}
        <StreamForm
          // initialValues={{ title: 'EDIT ME', description: 'CHANGE ME TOO' }}
          // stream is an object with title and description property
          initialValues={this.props.stream}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;

  return { stream: state.streams[streamId] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit,
);
