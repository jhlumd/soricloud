import React, { Component } from "react";
import { connect } from "react-redux";
import { playMusic, pauseMusic } from "../../actions/track_player_actions";
import { fetchCurrentTrack } from "../../actions/track_actions";

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.playMusic = this.playMusic.bind(this);
  }

  playMusic() {
    if (this.props.currentTrackId === this.props.trackId) {
      this.props.playMusic();
    } else {
      this.props.fetchCurrentTrack(this.props.trackId);
    }
  }

  render() {
    const {
      playing,
      currentTrackId,
      trackId,
      playButtonShow,
      sizeType,
      pauseMusic
    } = this.props;

    if (playing && currentTrackId === trackId) {
      return (
        <div className={`play-button show in-play-button ${sizeType}`}>
          <img src={window.pauseIcon2} onClick={pauseMusic} />
        </div>
      );
    } else {
      return (
        <img
          className={`play-button ${playButtonShow ? "show" : ""} ${sizeType}`}
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
