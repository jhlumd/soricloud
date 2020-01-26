import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteComment, fetchComments } from "../../actions/comment_actions";
import ReplyFormC from "./reply_form_container";
import ReplyIndex from "./reply_index";

// FIXME = trackTime onClick => track player action to update currentTime and play audio

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      showForm: false
    };

    this.createdAtStamp = this.createdAtStamp.bind(this);
    this.showReply = this.showReply.bind(this);
    this.hideReply = this.hideReply.bind(this);
    this.showReplyForm = this.showReplyForm.bind(this);
    this.resetReplyForm = this.resetReplyForm.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.redirectToUserPage = this.redirectToUserPage.bind(this);
  }

  createdAtStamp(date) {
    const timeNow = Date.now();
    const createdTime = new Date(date);
    const rawHours = (timeNow - createdTime) / (1000 * 60 * 60);

    if (rawHours < 1) {
      const inMinutes = Math.floor(rawHours * 60);
      return `${inMinutes} minutes ago`;
    } else if (rawHours < 24) {
      const inHours = Math.floor(rawHours);
      if (inHours === 1) {
        return `an hour ago`;
      } else {
        return `${inHours} hours ago`;
      }
    } else {
      const inDays = Math.floor(rawHours / 24);
      if (inDays === 1) {
        return `a day ago`;
      } else {
        return `${inDays} days ago`;
      }
    }
  }

  showReply() {
    this.setState({ showButtons: true });
  }

  hideReply() {
    this.setState({ showButtons: false });
  }

  showReplyForm() {
    if (!this.state.showForm) {
      this.setState({ showForm: true });
    }
  }

  resetReplyForm() {
    this.setState({ showForm: false });
  }

  deleteComment() {
    const that = this;
    this.props.deleteComment(this.props.comment.id).then(() => {
      that.props.fetchComments(that.props.comment.track_id);
    });
  }

  redirectToUserPage() {
    this.props.history.push(`/users/${this.props.comment.user_id}`);
  }

  render() {
    const {
      id,
      username,
      body,
      created_at: createdAt,
      user_id: userId,
      track_id: trackId,
      track_time: trackTime,
      photoUrl,
      childComments
    } = this.props.comment;
    const { currentUserId } = this.props;

    const usernameStamp = userId === currentUserId ? "You" : username;
    const deleteButton =
      userId === currentUserId ? (
        <button
          className={`comment-reply-button ${
            this.state.showButtons ? "comment-reply-show" : ""
          }`}
          onClick={this.deleteComment}
        >
          {" "}
          <i className="fas fa-trash"></i>
        </button>
      ) : null;

    const repliesIndex =
      childComments.length > 0 ? (
        <ReplyIndex
          childComments={childComments}
          currentUserId={currentUserId}
          showReplyForm={this.showReplyForm}
        />
      ) : null;
    const replyFormShow = this.state.showForm ? (
      <ReplyFormC
        parentCommentId={id}
        trackId={trackId}
        resetReplyForm={this.resetReplyForm}
      />
    ) : null;

    return (
      <div className="comment-item-container">
        <div className="comment-item-inner-container">
          <img src={photoUrl} className="profile-picture-comment" />
          <div
            className="comment-item"
            onMouseEnter={this.showReply}
            onMouseLeave={this.hideReply}
          >
            <div className="comment-info">
              {/* FIXME THIS CLICK TO TRACK TIME */}
              <p onClick={this.redirectToUserPage}>
                {usernameStamp} <span className="comment-at">at</span>{" "}
                {trackTime}:
              </p>
              <p>{this.createdAtStamp(createdAt)}</p>
            </div>
            <div className="comment-info">
              <p className="comment-body">{body}</p>
              <div className="comment-edit-things">
                <button
                  className={`comment-reply-button ${
                    this.state.showButtons ? "comment-reply-show" : ""
                  }`}
                  onClick={this.showReplyForm}
                >
                  {" "}
                  <i className="fas fa-reply"></i> Reply
                </button>
                {deleteButton}
              </div>
            </div>
          </div>
        </div>
        {repliesIndex}
        {replyFormShow}
      </div>
    );
  }
}

const mdtp = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  fetchComments: trackId => dispatch(fetchComments(trackId))
});

export default withRouter(connect(null, mdtp)(CommentItem));
