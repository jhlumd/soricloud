import React, { Component } from "react";
// import SeekBar from "./seek_bar";

export default class TrackPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: props.currentTrack,
    };

    this.trackPlayerRef = React.createRef();
    this.volumeBarRef = React.createRef();

    
  }

  render() {
    return (
      <>
        
      </>
    );
  }
}
