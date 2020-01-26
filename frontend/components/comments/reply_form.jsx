import React, { Component } from "react";

export default class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      const comment = {
        body: this.state.body,
        user_id: this.props.currentUser.id,
        track_id: this.props.trackId,
        parent_cmt_id: this.props.parentCommentId
      };
      this.props.createComment(comment).then(this.resetForm);
    } else {
      this.props.openModal("loginInput"); // fixme focus reply form after login/signup
    }
  }

  resetForm() {
    this.props.resetReplyForm();
    this.props.fetchComments(this.props.trackId);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="comment-reply-form-container">
        <div className="comment-reply-form-inner-container">
          <img
            className="profile-picture-comment-form"
            src={currentUser ? currentUser.photoUrl : window.defaultUserPhoto}
          />
          <form id="comment-reply-form-input" onSubmit={this.handleSubmit}>
            <input
              className="comment-reply-form"
              type="text"
              placeholder="Write a reply"
              value={this.state.body}
              onChange={this.handleChange("body")}
            />
          </form>
        </div>
      </div>
    );
  }
}
