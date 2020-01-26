import React from "react";
import { connect } from "react-redux";
import ReplyItem from "./reply_item";

const ReplyIndex = props => {
  const {
    childComments,
    currentUserId,
    comments,
    showReplyForm
  } = props;

  const replyFiltered = childComments
    .filter(id => (comments[id] ? id : null))
    .map(id => comments[id]);

  const replyIndex = replyFiltered.map(comment => (
    <ReplyItem
      key={comment.id}
      comment={comment}
      currentUserId={currentUserId}
      showReplyForm={showReplyForm}
    />
  ));

  return (
    <div className="child-comment-index-container">{replyIndex}</div>
  );
};

const mstp = state => ({
  comments: state.entities.comments
});

export default connect(mstp, null)(ReplyIndex);
