import { connect } from "react-redux";
import { createComment, fetchComments } from "../../actions/comment_actions";
import { openModal } from "../../actions/modal_actions";
import ReplyForm from "./reply_form";

const mstp = state => {
  const currentUser = state.session.id
    ? state.entities.users[state.session.id]
    : null;
  return {
    currentUser
  };
};

const mdtp = dispatch => ({
  createComment: comment => dispatch(createComment(comment)),
  fetchComments: trackId => dispatch(fetchComments(trackId)),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mstp, mdtp)(ReplyForm);