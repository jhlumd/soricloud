import React, { Component } from "react";
import { connect } from "react-redux";
import { playMusic, pauseMusic } from "../../actions/track_player_actions";
import { fetchCurrentTrack } from "../../actions/track_actions";

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.playMusic = this.playMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
  }

  playMusic() {
    if (this.props.currentTrackId === this.props.trackId) {
      this.props.playMusic();
    } else {
      this.props.fetchCurrentTrack(this.props.trackId);
    }
  }

  pauseMusic() {
    this.props.pauseMusic();
  }

  render() {
    if (this.props.playing && this.props.currentTrackId === this.props.trackId) {
      return (
        <div className={`play-button show in-play-button ${this.props.sizeType}`}>
          <img src={window.pauseIcon2} onClick={this.pauseMusic} />
        </div>
      );
    } else {
      return (
        <img
          className={`play-button ${this.props.playButtonShow ? "show" : ""} ${
            this.props.sizeType
          }`}
          src={window.playIcon}
          onClick={this.playMusic}
        />
      );
    }
  }
}

const mstp = state => ({
  currentTrackId: state.ui.currentTrack ? state.ui.currentTrack.id : null,
  playing: state.ui.trackPlayer.playing
});

const mdtp = dispatch => ({
  playMusic: () => dispatch(playMusic()),
  pauseMusic: () => dispatch(pauseMusic()),
  fetchCurrentTrack: id => dispatch(fetchCurrentTrack(id))
});

export default connect(mstp, mdtp)(PlayButton);
