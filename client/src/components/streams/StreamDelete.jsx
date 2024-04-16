import React from 'react';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {
  const actions = (
    // The only time we're going to use React.Fragment instead of <></>
    // is that, there is some tooling out there like some linter, some
    // code quality checkers that do  not think that empty tags like that
    // are a valid syntax.
    // So some code quality checkers that we might be running even inside of our
    // own code editor will think that  this is invalid JSX and throw an error
    // and warns, hey this is not valid, you're doing something wrong here.
    <React.Fragment>
      <button className='ui button negative'>Delete</button>
      <button className='ui button'>Cancel</button>
    </React.Fragment>
  );

  return (
    <div>
      StreamDelete
      <Modal
        title='Delete Stream'
        content='Are you sure you want to delte this stream?'
        actions={actions}
        onDismiss={() => history.push('/')}
      />
    </div>
  );
};

export default StreamDelete;
