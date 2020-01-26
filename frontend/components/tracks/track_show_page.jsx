import React, { Component } from "react";
import PlayButton from "../tracks/play_button";
import SeekBar from "../track_player/seek_bar";
import Waveform from "../waveform/waveform";
import CommentForm from "../comments/comment_form_container";
import CommentIndex from "../comments/comment_index";

export default class TrackShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTimeStamp: null
    };
    
    this.deleteTrack = this.deleteTrack.bind(this);
    this.redirectToUserPage = this.redirectToUserPage.bind(this);
    this.loadAudio = this.loadAudio.bind(this);
  }

  componentDidMount() {
    const trackId = this.props.match.params.trackId;
    this.props.fetchTrack(trackId).then(
      () => this.loadAudio(),
      () => this.props.history.push("/")
    );
    this.props.clearComments();
    this.props.fetchComments(trackId);
  }

  componentDidUpdate(prevProps) {
    const trackId = this.props.match.params.trackId;
    if (this.props.track === null) {
      this.props.fetchTrack(trackId).then(
        () => this.loadAudio(),
        () => this.props.history.push("/")
      );
      this.props.clearComments();
      this.props.fetchComments(trackId);
    } else if (prevProps.track && this.props.track.id !== prevProps.track.id) {
      this.props.fetchTrack(trackId).then(
        () => this.loadAudio(),
        () => this.props.history.push("/")
      );
      this.props.clearComments();
      this.props.fetchComments(trackId);
    }
  }

  deleteTrack() {
    this.props.deleteTrack(this.props.track.id)
      .then(() => this.props.history.push("/discover"));
  }

  formatTimeStamp(totalTime) {
    let seconds = Math.floor(totalTime % 60);
    let minutes = Math.floor(totalTime / 60 % 60);
    let hours = Math.floor(totalTime / 3600);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 1 ? "" : hours + ":";

    return `${hours}${minutes}:${seconds}`;
  }

  loadAudio() {
    const audioObj = new Audio();
    if (this.props.track) {
      audioObj.src = this.props.track.trackUrl;
    }

    audioObj.onloadedmetadata = () => {
      const trackTimeStamp = this.formatTimeStamp(audioObj.duration);
      this.setState({ trackTimeStamp });
    };
  }

  redirectToUserPage() {
    this.props.history.push(`/users/${this.props.user.id}`);
  }

  render() {
    const { user, track, currentTrack, currentUserId } = this.props;

    let pressPlayButton = null;
    let trackTitle = null;
    let trackPhoto = null;
    let description = null;
    let deleteButton = null;
    let createdAt = null;
    let showComments = null;
    let commentForm = null;
    if (track) {
      trackTitle = track.title;
      description = track.description;
      trackPhoto = <img className="track-photo" src={track.photoUrl} />;
      pressPlayButton = (
        <PlayButton
          trackId={track.id}
          playButtonShow={true}
          sizeType={"large"}
        />
      );
      showComments = (<CommentIndex currentUserId={this.props.currentUserId} />);
      commentForm = (<CommentForm trackId={this.props.track.id} />);

      if (track.user_id === currentUserId) {
        deleteButton = (
          <button className="edit-button" onClick={this.deleteTrack}>
            <img src={window.trashIcon} alt="" />
            Delete
          </button>
        );
      }

      const timeNow = Date.now();
      const createdTime = new Date(track.created_at);
      const timeDiff = Math.floor(
        (timeNow - createdTime) / (1000 * 60 * 60 * 24)
      );
      createdAt =
        timeDiff < 1 ? (
          <h1 className="track-time-stamp">less than one day ago</h1>
        ) : (
          <h1 className="track-time-stamp">{`${timeDiff} days ago`}</h1>
        );
    }

    let username = null;
    let trackUserPhoto = null;
    if (user) {
      username = user.username;
      trackUserPhoto = (
        <img
          className="track-user-photo"
          src={user.photoUrl}
          onClick={this.redirectToUserPage}
        />
      );
    }

    const seekBar =
      currentTrack && track.id === currentTrack.id ? (
        <SeekBar seekBarStyle={"long"} />
      ) : (
        <div className="empty-seek"></div>
      );

    let waveform = null;
    let currentTime = null;
    if (currentTrack && track && track.id === currentTrack.id) {
      waveform = (
        <Waveform
          trackUrl={track.trackUrl}
          active={true}
          waveStyle={"trackShow"}
        />
      );
      currentTime = (
        <span className="show-current-time">
          {this.formatTimeStamp(this.props.currentTime)}
        </span>
      );
    } else if (track) {
      waveform = (
        <Waveform
          trackUrl={track.trackUrl}
          active={false}
          waveStyle={"trackShow"}
        />
      );
    }

    const trackTime = this.state.trackTimeStamp ? (
      <span className="show-track-time">{this.state.trackTimeStamp}</span>
    ) : null;

    return (
      <div className="centering-background">
        <div className="centering-outer">
          <div className="track-show-page">
            <div className="track-show-page-container">
              <div className="track-show-page-player-container">
                <div className="track-show-page-player">
                  {pressPlayButton}
                  <ul className="track-info">
                    <li
                      className="track-username"
                      onClick={this.redirectToUserPage}
                    >
                      {username}
                    </li>
                    <li className="track-title">{trackTitle}</li>
                  </ul>
                </div>
                <div id="waveform"></div>
                {currentTime}
                {trackTime}
                {waveform}
                {seekBar}
              </div>
              <div className="track-photo-container">
                {createdAt}
                {trackPhoto}
              </div>
            </div>
            <div className="show-page-bottom">
              <div className="comment-divider">
                {commentForm}
                <div className="edit-buttons">
                  {deleteButton}
                </div>
              </div>
              <div className="show-page-bottom-bottom">
                <div className="show-page-bottom-left">
                  {trackUserPhoto}
                  <span
                    className="track-user-username"
                    onClick={this.redirectToUserPage}
                  >
                    {username}
                  </span>
                </div>
                <div className="show-page-bottom-right">
                  <div className="track-description">{description}</div>
                  {showComments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
