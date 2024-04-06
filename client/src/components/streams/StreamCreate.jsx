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
  // @ renderInput()
  // Anytime the Field tag calls `this.renderInput`, its gonna pass in some
  // number of arguments here on this renderInput which we named as formProps
  // function renderInput(formProps) {}
  // console.log(formProps);
  /*
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
      // input shorthand 
      // <input {...formProps.input} />
      // Anytime that we make use of Redux Form, we're always going to use the
      // syntax because there are some other properties inside that input 
      // object besides just the value one, and the onChange one, that Redux
      // Form cares about
      //
      // Further shorthand, we can destructure the input argument out of the
      // formProps object
      // renderInput({ input }) {
      //   <input {...input} />
      // }
    */
  renderInput({ input, label }) {
    return (
      <div className='field ui form'>
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  onSubmit(formValues) {
    // No longer we're dealing with event object as our argument here.
    // The event object is really not useful to us one bit
    // The only reason we dealt with the event object is so that we can call
    // preventDefault method
    // Instead now its going to get called with all the values out of our form
    // inside of an object
    console.log(formValues);
  }

  render() {
    // console.log('StreamCreate', this.props);
    // `this.props.handleSubmit` is a callback function provided by Redux Form
    // we then call that function with our call back method that we defined inside
    // of our component
    // now internally, handleSubmit on this.props.handleSubmit is now automatically
    // receives event object and automatically call preventDefault() for us.
    // Redux Form takes care of it for us.
    // In fact onSubmit is not even going to be called with an `event` object
    // at all. Instead, its going to be called with whatever values existed
    // inside of our two field inputs
    // usually we refer to that argument as `formProps`
    // Now formProps does not mean that this is some data passed down by a
    // parent component. The better name for this argument is `formValues`
    // In simple, we reference handleSubmit and pass in whatever callback
    // we want to run after the form gets submitted.
    // So in relality, handleSubmit is going to be called and once it processes
    // the form event and all that good stuff, our callback then gets invoked
    // with our actual form values that we care about.
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
// This validate function will called by Redux Form for every interactions
// to the form like selecting the fields, editing the fields on every keystroke,
// like that.
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

// reduxForm is going to return a function and we immediately call that function
// with StreamCreate
// reduxForm receives a single object and we put bunch of configuration into
// that object
export default reduxForm({
  // name of this `form` is generally whatever the purpose of the form is
  form: 'streamCreate',
})(StreamCreate);
