import React from 'react';
// reduxForm is a function that's going to essentially have the exact same
// functionality as the `connect()` function that we used from the `react-redux`
// library
// The reduxForm function is essentially what's going to make sure that we can
// call some action creator and get some form data into our component. Cool thing
// is that all happens automatically
import { Field, reduxForm } from 'redux-form';

// The reason we're going to make this Class based Component is that we're
// going to eventually want to have a bunch of helper methods so we kind kindof
// better organize our code inside of here!
class StreamCreate extends React.Component {
  render() {
    // console.log('StreamCreate', this.props);
    return (
      <form>
        <Field name='title' />
        <Field name='description' />
      </form>
    );
  }
}

// reduxForm is going to return a function and we immediately call that function
// with StreamCreate
// reduxForm receives a single object and we put bunch of configuration into
// that object
export default reduxForm({
  // name of this `form` is generally whatever the purpose of the form is
  form: 'streamCreate',
})(StreamCreate);
