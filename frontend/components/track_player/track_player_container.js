import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  playMusic,
  pauseMusic,
  receiveTrackInfo,
  updateCurrentTime,
  seekPercentage,
  clearSeekPercentage
} from "../../actions/track_player_actions";
import TrackPlayer from "./track_player";

const mstp = state => {
  const { currentTrack } = state.ui;
  const {
    playing,
    duration,
    currentTime,
    seekPercentage
  } = state.ui.trackPlayer;
  const percentage = currentTime / duration * 100;
  return {
    currentTrack,
    playing,
    duration,
    currentTime,
    percentage,
    seekPercentage
  };
};

const mdtp = dispatch => ({
  playMusic: () => dispatch(playMusic()),
  pauseMusic: () => dispatch(pauseMusic()),
  receiveTrackInfo: trackInfo => dispatch(receiveTrackInfo(trackInfo)),
  updateCurrentTime: currentTime => dispatch(updateCurrentTime(currentTime)),
  seekPercentage: newPercentage => dispatch(seekPercentage(newPercentage)),
  clearSeekPercentage: () => dispatch(clearSeekPercentage())
});

export default withRouter(connect(mstp, mdtp)(TrackPlayer));
