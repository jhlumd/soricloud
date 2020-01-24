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
    const recentTracks = this.props.tracks.reverse().slice(0, 12);
    const tracksIndex1 =
      this.props.tracks.length > 0 ? (
        <TracksIndex
          tracks={recentTracks}
          history={this.props.history}
          includePlayButton={true}
          trackSlider={true}
        />
      ) : null;

    return (
      <div className="home-page-container">
        <h1 className="track-header">More of SoriCloud's music</h1>
        <p className="track-subheader">Music from some of our artists</p>
        {tracksIndex1}
      </div>
    );
  }
}
