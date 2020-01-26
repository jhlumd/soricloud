import { connect } from "react-redux";
import { createComment, fetchComments } from "../../actions/comment_actions";
import { openModal } from "../../actions/modal_actions";
import CommentForm from "./comment_form";

const mstp = state => {
  const currentTrackId = state.ui.currentTrack || null;
  const currentUser = state.session.id
    ? state.entities.users[state.session.id]
    : null;
  const currentTime = state.ui.trackPlayer.currentTime || null;
  return {
    currentUser,
    currentTrackId,
    currentTime
  };
};

const mdtp = dispatch => ({
  createComment: comment => dispatch(createComment(comment)),
  fetchComments: trackId => dispatch(fetchComments(trackId)),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mstp, mdtp)(CommentForm);