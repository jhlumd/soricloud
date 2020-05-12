import React, { Component } from "react";
import TracksIndex from "./tracks_index";

export default class Discover extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    const { tracks } = this.props;
    const lengthWanted = 24;
    const recentTracks = tracks.slice(tracks.length - lengthWanted).reverse();
    const trackIndex =
      recentTracks.length > 0 ? (
        <TracksIndex tracks={recentTracks} includePlayButton={true} />
      ) : null;

    return (
      <div className="centering-background">
        <div className="centering-outer">
          <div className="home-page-container">
            <h1 className="track-header">More of SoriCloud's music</h1>
            <p className="track-subheader">Music from some of our artists</p>
            {trackIndex}
          </div>
        </div>
      </div>
    );
  }
}
