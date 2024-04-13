import _ from 'lodash';
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

        {/* streamForm: values
          // initialValues={this.props.stream}
          // Doing that will submit all the properties that aren't required 
          // We can check at: Redux Dev Tools: on Edit Stream component
          // form > streamForm > values > title, description, userId, id
         * there are 4 properties: title, description, userId and id
         * when we submit stream edit form where just title and description
         * will be sent, Redux form is going to pass along userId and id.
         * i.e Our form is supposed to have a field for userId and for id as well,  
         * and when we submit this form, Redux form is going to pass along that
         * userId and the id which again is not the worst thing for this application
         * but is really not appropriate to try to eventually submit to
         * some backend api
         * so on the prop: initialValues
         * instead of sending all the properties, we just send the title,
         * and description that we care about and pass that as initial values
         * to our form
         */}
        <StreamForm
          // initialValues={{ title: 'EDIT ME', description: 'CHANGE ME TOO' }}
          // stream is an object with title and description property
          // Long story short, essentially we only want to pass in an object
          // here with a title and description. Just the properties we're
          // trying to change
          // one way to write:
          // intitialValues={{
          //   title: this.props.stream.title,
          //   description: this.props.stream.description,
          // }}
          // another concise way to write:
          // using a lodash function .pick(), we pass in a list of all the
          // different properties that we want to essentially pull out of that
          // object and pass down to initial values
          // Now, we only have title and description loaded to our Redux form
          // pick() creates a new object and it doesn't modify original object
          initialValues={_.pick(this.props.stream, 'title', 'description')}
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
