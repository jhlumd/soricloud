import React, { Component } from "react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      commentTime: null,
    };

    this.commentFormRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.commentTime === null && this.state.body.length > 0) {
      const { trackId, currentTrackId, currentTime } = this.props;
      
      if (trackId === currentTrackId) {
        const timeStamp = currentTime
          ? this.formatTimeStamp(currentTime)
          : null;
        this.setState({ commentTime: timeStamp || "00:00" });
      } else {
        this.setState({ commentTime: "00:00" });
      }
    }
  }

  handleChange(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  formatTimeStamp(totalTime) {
    let seconds = Math.floor(totalTime % 60);
    let minutes = Math.floor((totalTime / 60) % 60);
    let hours = Math.floor(totalTime / 3600);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 1 ? "" : hours + ":";

    return `${hours}${minutes}:${seconds}`;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      const comment = {
        body: this.state.body,
        user_id: this.props.currentUser.id,
        track_id: this.props.trackId,
        track_time: this.state.commentTime
      };
      this.props.createComment(comment).then(this.resetForm);
    } else {
      this.props.openModal("loginInput"); //fix check after login correctly
    }
  }

  resetForm() {
    this.setState({
      body: "",
      commentTime: null
    });
    this.commentFormRef.current.blur();
    this.props.fetchComments(this.props.trackId);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="comment-form-container-outer">
        <img
          className="profile-picture-comment-form"
          src={currentUser ? currentUser.photoUrl : window.defaultUserPhoto}
        />
        <div className="comment-form-container">
          <form onSubmit={this.handleSubmit}>
            <input
              ref={this.commentFormRef}
              className="comment-form"
              type="text"
              placeholder="Write a comment"
              value={this.state.body}
              onChange={this.handleChange("body")}
            />
          </form>
        </div>
      </div>
    );
  }
}
