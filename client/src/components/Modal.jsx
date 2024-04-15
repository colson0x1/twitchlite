import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push('/')}
      className='ui dimmer modals visible active'
    >
      {/* If we click just to the left of delete button, that still dismisses 
        the entire modal or navigates us away.
        Essentially this is very basic event handling. This is event propagation.
        This is default JavaScript behavior, default HTML behavior.
        If we ever trigger an event on some child element like down below, and 
        that child element does not handle that event, the event is going to 
        be essentially bubble up to some parent element until it eventually gets 
        caught with the event handler.
        So in this case, if we click on any of the element down below, that click
        event is going to bubble up to that above div. Its going to run the 
        onClick event handler right there which is going to run history.push()
        So that's definately something that we probably don't want to happen.
        To make sure that doesn't occur, we can add a click event handler to the
        window div or the content div right below, the class name of ui standard modal
        So we add in a event handler to it and stop event propagation.
        Stop Propagation is going to make sure that, the event is not going to 
        bubble up and go to the div above thus causing our window to getting 
        dismissed by navigating to some other page.
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='ui standard modal visible active'
      >
        <div className='header'>Delete Stream</div>
        <div className='content'>
          Are you sure you want to delte this stream?
        </div>
        <div className='actions'>
          <button className='ui primary button'>Delete</button>
          <button className='ui button'>Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal'),
  );
};

export default Modal;
