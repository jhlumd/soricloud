import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PlayButton from "../tracks/play_button";
import WaveForm from "../waveform/waveform";
import SeekBar from "../track_player/seek_bar";

class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTimeStamp: null
    };

    this.createTrackTimeStamp = this.createTrackTimeStamp.bind(this);
  }

  componentDidMount() {
    this.createTrackTimeStamp();
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

  createTrackTimeStamp() {
    const audioObj = new Audio();
    audioObj.src = this.props.track.trackUrl;

    audioObj.onloadedmetadata = () => {
      const trackTimeStamp = this.formatTimeStamp(audioObj.duration);
      this.setState({ trackTimeStamp });
    };
  }

  render() {
    const { track, currentTrack, currentTime } = this.props;
    const trackPhoto = (
      <img className="user-showpage-track-item-photo" src={track.photoUrl} />
    );
    const trackTime = this.state.trackTimeStamp ? (
      <span className="user-showpage-track-timestamp">
        {this.state.trackTimeStamp}
      </span>
    ) : null;
    const showCurrentTimeStamp =
      currentTrack && track.id === currentTrack.id && currentTime ? (
        <span className="user-showpage-current-time">
          {this.formatTimeStamp(currentTime)}
        </span>
      ) : null;

    let waveForm;
    if (currentTrack && track.id === currentTrack.id) {
      waveForm = (
        <WaveForm
          trackUrl={track.trackUrl}
          active={true}
          waveStyle={"userShow"}
        />
      );
    } else {
      waveForm = (
        <WaveForm
          trackUrl={track.trackUrl}
          active={false}
          waveStyle={"userShow"}
        />
      );
    }

    const timeNow = Date.now();
    const createdTime = new Date(track.created_at);
    const timeDiff = Math.floor(
      (timeNow - createdTime) / (1000 * 60 * 60 * 24)
    );
    const createdAt =
      timeDiff < 1 ? (
        <h1 className="user-showpage-track-time-created-at">
          less than one day ago
        </h1>
      ) : (
        <h1 className="user-showpage-track-time-created-at">
          {`${timeDiff} days ago`}
        </h1>
      );

    return (
      <div className="user-showpage-track-item">
        {trackPhoto}
        <div className="user-showpage-track-item-info">
          <div className="user-showpage-track-item-info-top">
            <div className="user-showpage-track-item-left">
              <PlayButton
                trackId={track.id}
                playButtonShow={true}
                sizeType={"small"}
              />
              <div className="user-showpage-track-item-trackinfo">
                <p className="showpage-username">{track.username}</p>
                <p
                  className="showpage-title"
                  onClick={() => this.props.history.push(`/tracks/${track.id}`)}
                >
                  {track.title}
                </p>
              </div>
            </div>
            {createdAt}
          </div>
          <div className="user-showpage-waveform">
            {waveForm}
            <SeekBar seekBarStyle={"medium"} />
            {trackTime}
            {showCurrentTimeStamp}
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => ({
  currentTrack: state.ui.currentTrack,
  currentTime: state.ui.trackPlayer.currentTime
});

export default withRouter(connect(mstp, null)(TrackItem));
