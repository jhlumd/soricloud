import React, { Component } from "react";
// import TrackPlayButton from "../tracks/track_play_button";
// import SeekBar from "../track_player/seek_bar";
import Waveform from "../waveform/waveform";

export default class TrackShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTimeStamp: null
    };

    this.deleteTrack = this.deleteTrack.bind(this);
    this.redirectToUserPage = this.redirectToUserPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId).then(
      () => this.createTrackTimeStamp(),
      () => this.props.history.push("/")
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.track === null) {
      this.props.fetchTrack(this.props.match.params.trackId).then(
        () => this.createTrackTimeStamp(),
        () => this.props.history.push("/")
      );
    } else if (prevProps.track && this.props.track.id !== prevProps.track.id) {
      this.props.fetchTrack(this.props.match.params.trackId).then(
        () => this.createTrackTimeStamp(),
        () => this.props.history.push("/")
      );
    }
  }

  deleteTrack() {
    this.props.deleteTrack(this.props.track.id)
      .then(() => this.props.history.push("/"));
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

  createTrackTimeStamp() {
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
    if (track) {
      trackTitle = track.title;
      description = track.description;
      trackPhoto = <img className="track-photo" src={track.photoUrl} />;
      pressPlayButton = (
        <TrackPlayButton
          trackId={track.id}
          fetchCurrentTrack={this.props.fetchCurrentTrack}
          playButton={true}
          class={"large"}
        />
      );
      if (track.user_id === currentUserId) {
        deleteButton = (
          <button className="edit-button" onClick={this.deleteTrack}>
            <img src={window.trashIcon} alt="" />
            Delete
          </button>
        );
      }

      const timeNow = Date.now();
      const createdTime = new Date(track.createdAt);
      const timeDiff = Math.floor((timeNow - createdTime) / (1000 * 60 * 60 * 24));
      createdAt =
        timeDiff < 1 ? (
          <h1 className="track-time-stamp">less than one day ago</h1>
        ) : (
          <h1 className="track-time-stamp">{`${createdAt} days ago`}</h1>
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
            <div className="edit-buttons">{deleteButton}</div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
