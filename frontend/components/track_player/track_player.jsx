import React, { Component } from "react";
// import SeekBar from "./seek_bar";

export default class TrackPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: props.currentTrack,
      currentTimeStamp: null,
      trackTimeStamp: null,
      volumeBar: false,
      previousVolume: 0,
      mute: false
    };

    this.audioPlayer = React.createRef();
    this.volumeBar = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.playback = this.playback.bind(this);
    this.changePercentage = this.changePercentage.bind(this);
    this.showVolumeBar = this.showVolumeBar.bind(this);
    this.hideVolumeBar = this.hideVolumeBar.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.mute = this.mute.bind(this);
  }

  componentDidMount() {
    this.audioPlayer.current.onloadedmetadata = () => {
      this.props.receiveTrackInfo(this.audioPlayer.current);
      const trackTimeStamp = this.formatTimeStamp(this.props.duration);
      this.play();
      this.setState({ trackTimeStamp });
      this.audioPlayer.current.volume = this.volumeBar.current.value / 100;
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      seekPercentage,
      updateCurrentTime,
      currentTime,
      percentage,
      currentTrack,
      playing
    } = this.props;

    if (seekPercentage) {
      this.changePercentage(seekPercentage);
    } else if (this.state.currentTrack) {
      this.audioPlayer.current.ontimeupdate = () => {
        updateCurrentTime(this.audioPlayer.current.currentTime);
        const currentTimeStamp = this.formatTimeStamp(currentTime);
        this.setState({ currentTimeStamp });
        if (percentage >= 99.9) {
          this.pause();
          updateCurrentTime(0);
          this.audioPlayer.current.currentTime = currentTime;
        }
      };

      if (this.state.currentTrack !== currentTrack) {
        this.pause();
        this.setState({ currentTrack });
        this.play();
      } else if (!playing) {
        this.audioPlayer.current.pause();
      } else if (playing) {
        this.audioPlayer.current.play();
      }
    }
  }

  changePercentage(seekPercentage) {
    const newTime = this.props.duration * (seekPercentage / 100);
    this.audioPlayer.current.currentTime = newTime;
    this.props.clearSeekPercentage();
    this.props.updateCurrentTime(newTime);
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

  play() {
    this.props.playMusic();
  }

  pause() {
    this.props.pauseMusic();
  }

  playback() {
    this.changePercentage(0);
  }

  showVolumeBar() {
    this.setState({ volumeBar: true });
  }

  hideVolumeBar() {
    this.setState({ volumeBar: false });
  }

  changeVolume() {
    this.audioPlayer.current.volume = this.volumeBar.current.value / 100;
  }

  mute() {
    if (this.audioPlayer.current.volume !== 0) {
      this.setState({
        previousVolume: this.audioPlayer.current.volume * 100,
        mute: true
      });
      this.audioPlayer.current.volume = 0;
      this.volumeBar.current.value = 0;
    } else {
      this.setState({ mute: false });
      this.audioPlayer.current.volume = this.state.previousVolume / 100;
      this.volumeBar.current.value = this.state.previousVolume;
    }
  }
  
  render() {
    const author = this.state.currentTrack.username;
    const title = this.state.currentTrack.title;
    const photo = (
      <img
        className="track-player-photo"
        src={this.state.currentTrack.photoUrl}
      />
    );

    const currentTime = this.props.currentTime
      ? this.formatTimeStamp(this.props.currentTime)
      : this.formatTimeStamp(0);
    const trackTime = this.props.duration
      ? this.formatTimeStamp(this.props.duration)
      : this.formatTimeStamp(0);
    const playback = (
      <img
        className="pause-play"
        src={window.playbackIcon}
        onClick={this.playback}
      />
    );
    const playOrPause = this.props.playing ? (
      <img className="pause-play" src={window.pauseIcon} onClick={this.pause} />
    ) : (
      <img className="pause-play" src={window.playIcon2} onClick={this.play} />
    );
    const volume = (
      <img
        className="pause-play"
        src={this.state.mute ? window.muteIcon : window.volumeIcon}
        onMouseEnter={this.showVolumeBar}
        onClick={this.mute}
      />
    );
    const volumeBar = (
      <input
        ref={this.volumeBar}
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="volume-slider"
        onChange={this.changeVolume}
      />
    );
    return (
      <>
        <audio
          ref={this.audioPlayer}
          src={this.state.currentTrack.trackUrl}
          preload="auto"
        ></audio>
        <div
          className="track-player-container"
          onMouseLeave={this.hideVolumeBar}
        >
          <div className="track-player">
            {playback}
            {playOrPause}
            <p className="times current-time">{currentTime}</p>
            <SeekBar />
            <p className="times">{trackTime}</p>
            {volume}
            <div
              className={`volume-slider-container ${
                this.state.volumeBar ? "show-volume" : ""
              }`}
              onMouseEnter={this.showVolumeBar}
              onMouseLeave={this.hideVolumeBar}
            >
              {volumeBar}
            </div>
            <div
              className={`triangle ${
                this.state.volumeBar ? "show-volume" : ""
              }`}
              onMouseEnter={this.showVolumeBar}
              onMouseLeave={this.hideVolumeBar}
            ></div>
          </div>
          <div className="track-player-info">
            {photo}
            <div className="track-player-user-info">
              <p
                className="author"
                onClick={() =>
                  this.props.history.push(
                    `/users/${this.state.currentTrack.user_id}`
                  )
                }
              >
                {author}
              </p>
              <p
                className="title"
                onClick={() =>
                  this.props.history.push(
                    `/tracks/${this.state.currentTrack.id}`
                  )
                }
              >
                {title}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
