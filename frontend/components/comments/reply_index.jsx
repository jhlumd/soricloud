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

  const replyIndex = childComments
    .filter(id => comments[id])
    .map(id => (
      <ReplyItem
        key={id}
        comment={comments[id]}
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
