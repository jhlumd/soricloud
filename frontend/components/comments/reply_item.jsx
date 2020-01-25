import React, { Component } from "react";
// import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/comment_actions";

// this.props.commentId

class ReplyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false
    };

    this.createdAtStamp = this.createdAtStamp.bind(this);
    this.showReply = this.showReply.bind(this);
    this.hideReply = this.hideReply.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  createdAtStamp(createdAtDate) {
    let createdAtStamp;
    const timeNow = Date.now();
    const createdTime = new Date(createdAtDate);
    let rawCreatedAtStamp = (timeNow - createdTime) / (1000 * 60 * 60);
    if (rawCreatedAtStamp < 1) {
      createdAtStamp = Math.floor(rawCreatedAtStamp * 60);
      return `${createdAtStamp} minutes ago`;
    } else if (rawCreatedAtStamp < 24) {
      createdAtStamp = Math.floor(rawCreatedAtStamp);
      if (createdAtStamp === 1) {
        return `${createdAtStamp} hour ago`;
      } else {
        return `${createdAtStamp} hours ago`;
      }
    } else {
      createdAtStamp = Math.floor(
        (timeNow - createdTime) / (1000 * 60 * 60 * 24)
      );
      return `${createdAtStamp} days ago`;
    }
  }

  showReply() {
    this.setState({ showButtons: true });
  }

  hideReply() {
    this.setState({ showButtons: false });
  }

  deleteComment() {
    this.props.deleteComment(this.props.commentId);
  }

  render() {
    const username = this.props.username;
    const trackTime = this.props.trackTime;
    const body = this.props.body;
    const createdAt = this.props.createdAt;
    const userId = this.props.userId;
    const currentUserId = this.props.currentUserId;
    const profilePicture = (
      <img src={this.props.photoUrl} className="profile-picture-comment" />
    );

    let createdAtStamp = this.createdAtStamp(createdAt);

    let usernameStamp;
    if (userId === currentUserId) {
      usernameStamp = "You";
    } else {
      usernameStamp = username;
    }

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
    return (
      <div className="comment-item-inner-container">
        {profilePicture}
        <div
          className="child-comment-item"
          onMouseEnter={this.showReply}
          onMouseLeave={this.hideReply}
        >
          <div className="comment-info">
            <p>
              {usernameStamp} <span className="comment-at">at</span> {trackTime}
              :
            </p>
            <p>{createdAtStamp}</p>
          </div>
          <div className="comment-info">
            <p className="comment-body">{body}</p>
            <div className="comment-edit-things">
              <button
                className={`comment-reply-button ${
                  this.state.showButtons ? "comment-reply-show" : ""
                }`}
                onClick={this.props.showCommentReplyForm}
              >
                {" "}
                <i className="fas fa-reply"></i> Reply
              </button>
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mdtp = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(null, mdtp)(ReplyItem);
