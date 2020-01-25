import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment, fetchComments } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mstp = (state, ownProps) => {
  const currentTrackId = state.ui.currentTrack || null;
  const trackId = ownProps.match.params.trackId;
  const currentUser = state.session.id
    ? state.entities.users[state.session.id]
    : null;
  const currentTime = state.ui.trackPlayer.currentTime || null;
  return {
    currentUserId: state.session.id,
    currentUser,
    trackId,
    currentTrackId,
    currentTime
  };
};

const mdtp = dispatch => ({
  createComment: comment => dispatch(createComment(comment)),
  fetchComments: trackId => dispatch(fetchComments(trackId))
});

export default withRouter(connect(mstp, mdtp)(CommentForm));