import React from "react";
import { connect } from "react-redux";
import CommentItem from "./comment_item";

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

export default connect(mstp, null)(CommentIndex);
