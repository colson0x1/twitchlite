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

  render() {
    // console.log('StreamCreate', this.props);
    return (
      <form>
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />
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
