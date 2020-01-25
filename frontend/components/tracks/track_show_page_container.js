import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TrackShowPage from "./track_show_page";
import {
  fetchTrack,
  deleteTrack,
  fetchCurrentTrack
} from "../../actions/track_actions";

const mstp = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId] || null;
  const user = track ? state.entities.users[track.user_id] : null;
  const currentTrack = state.ui.currentTrack || null;
  const currentTime = state.ui.trackPlayer.currentTime || null;
  return {
    user,
    track,
    currentUserId: state.session.id,
    currentTrack,
    currentTime
  };
};

const mdtp = dispatch => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  deleteTrack: id => dispatch(deleteTrack(id)),
  fetchCurrentTrack: id => dispatch(fetchCurrentTrack(id))
});

export default withRouter(connect(mstp, mdtp)(TrackShowPage));
