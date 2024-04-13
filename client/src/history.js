/* React Router History
Note: History Object Deprecation
React Router DOM: v4.4.0
we get warning:
please use require('history').createBrowserHistory instead of 
require('history/createBrowserHistory'). support for the latter will be removed 
in the next major release. */

// To fix, history.js file should instead look like:
// import { createBrowserHistory } from 'history'
// export default createBrowserHistory();

/* We get history object that gets created by the BrowserRouter.
 * The BrowserRouter communicates the history object down to our Component.
 *
 * PROBLEM: Accessing to history object outside of BrowerRouter
 *
 * *** Approach 1: ***
 * And we could say, anytime our Component calls our action creator,
 * the component should pass along the history object into the action creator
 * and so that's essentially saying, that inside of action creator right here
 * (i.e createStream), we would receive not only our formValues but also some
 * history object as well.
 * Now this is kind of a pain, because it means every single time we want to do
 * programmatic navigation, we would have to write our action creators to be
 * called with the history object and we would make sure that all of our
 * components call the action creator with the history object as well.
 * So even though this is possible this is not super ideal!
 *
 * *** Approach 2: EFFICIENT ***
 * The reasons we're going to this approaches is because just getting access
 * to the history object outside of BrowserRouter is a pain.
 * The best solution is:
 * First thing to know that the BrowserRouter internally creates the history
 * object, and the fact that the Browser Router maintains that history object
 * is what makes our life a little bit more challenging.
 * So essentially we're just going to kinda turn the tables on the BrowserRouter.
 * We are going to create the history object instead inside of a dedicated file
 * inside of our project.
 * Then anytime that we want to get access to that history object we created,
 * we're just going to import that file, we're going to import that history
 * object very easily because we're maintaining control over the history object
 * ourselves and we're not allowing React Router to create the history object itself.
 * So that's how we get easy control over this history object. We create it ourself
 * as opposed to allowing React Router to create it!
 *
 * When we create the history object, we're gonna create a history object that
 * is the corresponding type to whatever router we've created.
 * Whenever we create a BrowserRouter, internally that creates an object, not
 * just called history, its the BrowserHistory object or like the browser
 * flavor of the history object.
 *  Because now we're creating our own history object, we're no longer going
 *  to create a browser router object as the top of our component hierarchy
 *  instead we're going to create a plain router.
 *  We create a plain router when we create the history object ourselves.
 *  Essentially, when we create a Browser Router, BrowserRouter internally decides
 *  to create a browser history, so now that we're creating a browser history
 *  ourselves, we use a generic router.
 */

/* @ Custom Browser History Object */
// inside or src/ dir
// We are maintaining this history object as opposed to React Router.
// Because we're creating it, its' gonna be a lot easier to get access to it
// and change what page the user is looking at.

// history right here in `history/createBrowserHistory`, the history package
// was automatically installed with `react-router-dom`
// history object is technically a separate library that react router dom
// depends upon on as a dependency
// So we're importing from the history package a file called createBrowserHistory
// so createHistory right here is the function that we can call to create a new
// history object
/*
 * old way
 * we get warning:
 * please use require('history').createBrowserHistory instead of
 * require('history/createBrowserHistory').
 * support for the latter will be removed in the next major release.
 *
 * import createHistory from 'history/createBrowserHistory';
 *
 * export default createHistory();
 */

/* @ new way to use history */
import { createBrowserHistory } from 'history';
export default createBrowserHistory();

// So this is now going to create a history object that we maintain instead of
// react router dom and we can now get access to it anywhere inside of our project!
// After this we need to create a PlainRouter instead of BrowserRouter in App
// Component
// We get error if we don't do that
