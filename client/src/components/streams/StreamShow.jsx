import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

/* overview: make the video player somehow request video to come from RTMP server
 * In order to do so, we're going to use FLV package.
 * FLV is about downloading that video stream and converting it to some file
 * that can actually be played inside of this normal html video player.
 * We can think, FLV js a little bit more like axios. In that its going to
 * reach out to some remote server, get some resource and serve up that data
 * to our application to be consumed on the screen.
 */

/* @ OBS Configuration
 * Stream Type: Custom Streaming Server
 * URL: rmtp://localhost/live
 * Stream key: STREAM_NAME (here Stream ID for us)
 */
class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.videoRef);

    this.props.fetchStream(id);
    // We only want to setup this video player right here after we know that
    // this appropriate stream has been actually fetched.
    // Hence, this is not the right location!
    /* this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load(); */

    // So now, whenever our component is first rendered, we're going to attempt
    // to fetch our streams. We're also gonna try to build the player.
    // So we're going to call buildPlayer() if we have not built the player
    // before and if we do not have stream, we're going to return.
    // So that's going to take care of the case of us first loading the page
    // and not yet having access to the actual stream.
    this.buildPlayer();
  }

  // Just in case we do not yet have access to our stream and we're going to
  // try to fetch it on the fly, we need to have some place to call buildPlayer
  // after we successfully fetched the stream!
  // Now the idea is that, when our component first renders, attempt to build
  // the player and then if our component fetches the stream successfully at
  // some point of time in he future and the component rerenders,
  // componentDidUpdate() will be called and we'll attempt to call build player
  // in there as well.
  // So essentially, at any point that this component gets rerendered, either
  // the intial render or any follow-up render, we're always going to attempt
  // to build a player.
  // But if we already built it and we already have a player OR if we do not
  // have the stream, then we're not going to try to build it.
  componentDidUpdate() {
    this.buildPlayer();
  }

  // our stream show component, which is creating a FLV video player, when
  // stream show component is unmounted from the DOM. in other words, when we
  // navigate away from the StreamShow component, there is no code that tells
  // this video player that we create to stop streaming video from our video
  // server.
  // So essentially, we're no longer looking at that video player, the video
  // player is still attempting to download and process video. And that's why
  // when we stop our stream, we eventually see this error on console log:
  // `[MSEController] > MediaSource onSourceEnded`
  // Its because that video player is still connected to that stream, and it
  // was still trying to receive new information.
  // We don't want to download a stream or process any of that video when the
  // video player is not present on the screen.
  // Any time we want to clean up some resources that were being used by our
  // component, we have componentWillUnmount() lifecycle method
  componentWillUnmount() {
    // console.log('video player is unmounted');
    // when we call destroy on the player, its going to essentially tell the
    // player to stop attempting to stream video and detach itself from that
    // video element that we had created down inside of that render method.
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    // We only want to setup this video player right here after we know that
    // this appropriate stream has been actually fetched.
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1 style={{ color: 'orangered' }}>{title}</h1>
        <h4 style={{ color: 'gray' }}>{description}</h4>
      </div>
    );
  }
}

// get that stream out of our Redux store and get it inside of our component
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
