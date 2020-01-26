import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchTrack,
  deleteTrack,
  fetchCurrentTrack
} from "../../actions/track_actions";
import { fetchComments, clearComments } from "../../actions/comment_actions";
import TrackShowPage from "./track_show_page";

const mstp = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId] || null;
  const user = track ? state.entities.users[track.user_id] : null;
  const currentTrack = state.ui.currentTrack || null;
  const currentTime = state.ui.trackPlayer.currentTime || null;
  const comments =
    track && track.comments
      ? track.comments.map(commentId => state.entities.comments[commentId])
      : null;
  return {
    user,
    track,
    currentUserId: state.session.id,
    currentTrack,
    currentTime,
    comments
  };
};

const mdtp = dispatch => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  deleteTrack: id => dispatch(deleteTrack(id)),
  fetchCurrentTrack: id => dispatch(fetchCurrentTrack(id)),
  fetchComments: trackId => dispatch(fetchComments(trackId)),
  clearComments: () => dispatch(clearComments())
});

export default withRouter(connect(mstp, mdtp)(TrackShowPage));
