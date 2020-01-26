import React from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions/comment_actions";
import CommentItem from "./comment_item";

// props.commentSSS
// props.currentUserId

const CommentIndex = props => {
  const { comments, currentUserId } = props;
  const commentIndexShow = Object.values(comments)
    .filter(comment => (comment.parent_cmt_id === null ? comment : null))
    .map(comment => (
      <CommentItem
        key={comment.id}
        comment={comment}
        currentUserId={currentUserId}
      />
    ));
  const commentCount = Object.values(comments).length;
  const howManyComments =
    commentCount === 1 ? "1 comment" : `${commentCount} comments`;
  return (
    <>
      <div className="comment-count">
        <i className="fas fa-comment"></i> {howManyComments}
      </div>
      <div className="comment-index-container">{commentIndexShow}</div>
    </>
  );
};

const mstp = state => ({
  comments: state.entities.comments
});

const mdtp = dispatch => ({
  fetchComments: trackId => dispatch(fetchComments(trackId))
});

export default connect(mstp, mdtp)(CommentIndex);
