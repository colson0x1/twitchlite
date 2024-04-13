import React from 'react';
// reduxForm is a function that's going to essentially have the exact same
// functionality as the `connect()` function that we used from the `react-redux`
// library
// The reduxForm function is essentially what's going to make sure that we can
// call some action creator and get some form data into our component. Cool thing
// is that all happens automatically
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

// The reason we're going to make this Class based Component is that we're
// going to eventually want to have a bunch of helper methods so we kind kindof
// better organize our code inside of here!
class StreamCreate extends React.Component {
  // this is going to be called with `meta` object
  renderError({ error, touched }) {
    // if user has touched the form and there is an error message, return
    // some error message to show to the user
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

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

  // renderInput is a function that we pass off to some other component
  // i.e <Field name='title' component={this.renderInput} label='..' />
  // So when renderInput is called, its going to be called with a unknown
  // value of `this`. In another words, the keyword `this` inside of renderInput
  // function on {this.renderError(meta)} is going to be unknown to us. It might
  // be undefined, it might be null, it might be some other component, who knows.
  // But its definately not the context that we want for our component.
  // So to fix this, we turn renderInput to arrow function to bind context of `this`
  renderInput = ({ input, label, meta }) => {
    // there's a error property on object received by meta props which contains
    // the error message i.e meta.error
    // we can show those errors underneath each inputs
    // console.log('renderInput called: meta prop -', meta);

    // if the div with the className field has also the className error on it,
    // then the entire text input and the label are gonna show up as red as well
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
    // No longer we're dealing with event object as our argument here.
    // The event object is really not useful to us one bit
    // The only reason we dealt with the event object is so that we can call
    // preventDefault method
    // Instead now its going to get called with all the values out of our form
    // inside of an object
    console.log(formValues);
    this.props.createStream(formValues);
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

    /* need to add className of error on form so that semantic ui shows error
     * and remove the default behavior of display property none for errors */

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

// NOTE: after creating validate function, we need to make sure that this
// validate function gets wired up to Redux Form so that it knows to use the
// validate function!
// We pass that to the reduxForm helper down here on a key called `validate`

// reduxForm is going to return a function and we immediately call that function
// with StreamCreate
// reduxForm receives a single object and we put bunch of configuration into
// that object

const formWrapped = reduxForm({
  // name of this `form` is generally whatever the purpose of the form is
  form: 'streamCreate',
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
