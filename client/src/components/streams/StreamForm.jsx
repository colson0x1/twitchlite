import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log('StreamCreate', this.props);

    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

// This is not a function we're going to define inside of our component class
// So defining outside of Component Class
// formValues is going to contain all the different values inside of our form
// This validate function will called by Redux Form when form is initially
// rendered!
// And also it will be called, for every interactions or keystrokes
// to the form like selecting the fields, editing the fields, like that.
// IF WE RETURN an object from the validate function,
// then Redux Form is going to automatically rerender our Component!
// To actually get these error messages to appear on the screen, Redux Form
// is going to take a look at every Field component that gets rendered.
// Its going to look at each Field's name property and then its going to look
// at the errors object that we return from validate function!!
// If a Field has a same name as a property that exists inside that error object,
// then Redux Form is going to take that error message and pass it to our
// renderInput fucntion (this.renderInput function on <Field />) for each
// Field that gets created

// In simple, the general idea here is that errors object has some properties
// on it that have an identical name to whatever names we provided to the
// field properties (i.e on <Field ... />),
// so if the error object has a property name that is identical to the `name`
// in the field property like `title` and `description` here, and it contains
// a string that error message will be passed down to this renderInput
// function
// i.e here, <Field name='title' component={this.renderInput} label='..' />
const validate = (formValues) => {
  // If the input field is invalid, for each invalid field, return an
  // error object with key-value pair on the object with NAME of the field
  // and the erro message
  const errors = {};

  if (!formValues.title) {
    // only run if the user did not enter a title
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
