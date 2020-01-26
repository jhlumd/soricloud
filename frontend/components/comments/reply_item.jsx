import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/comment_actions";

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

  deleteComment() {
    this.props.deleteComment(this.props.comment.id);
  }

  redirectToUserPage() {
    this.props.history.push(`/users/${this.props.comment.user_id}`);
  }

  render() {
    const {
      username,
      body,
      created_at: createdAt,
      user_id: userId,
      photoUrl
    } = this.props.comment;
    const { currentUserId, showReplyForm } = this.props;

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

    return (
      <div className="comment-item-inner-container">
        <img src={photoUrl} className="profile-picture-comment" />
        <div
          className="child-comment-item"
          onMouseEnter={this.showReply}
          onMouseLeave={this.hideReply}
        >
          <div className="comment-info">
            <p className="cmt-info-username" onClick={this.redirectToUserPage}>
              {usernameStamp}:
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
                onClick={showReplyForm}
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

export default withRouter(connect(null, mdtp)(ReplyItem));
