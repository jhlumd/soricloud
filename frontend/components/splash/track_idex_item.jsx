import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PlayButton from "../tracks/play_button";

export default class TrackIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playButton: false
    };

    this.revealPlayButton = this.revealPlayButton.bind(this);
    this.hidePlayButton = this.hidePlayButton.bind(this);
    this.redirectToTrackShowPage = this.redirectToTrackShowPage.bind(this);
  }

  revealPlayButton() {
    this.setState({ playButton: true });
  }

  hidePlayButton() {
    this.setState({ playButton: false });
  }

  redirectToTrackShowPage() {
    this.props.history.push(`/tracks/${this.props.trackId}`);
  }

  render() {
    const { trackId, title, photo, includePlayButton } = this.props;

    const playButton = includePlayButton ? (
      <PlayButton
        trackId={trackId}
        playButtonShow={this.state.playButton}
        sizeType={""}
      />
    ) : null;
    return (
      <div className="track-item">
        <div
          className="track-item-photo-container"
          onMouseEnter={this.revealPlayButton}
          onMouseLeave={this.hidePlayButton}
        >
          <img
            className="track-item-photo"
            src={photo}
            onClick={this.redirectToTrackShowPage}
          />
          {playButton}
        </div>
        <NavLink className="track-item-link" to={`/tracks/${trackId}`}>
          <h1>{title}</h1>
        </NavLink>
      </div>
    );
  }
}
