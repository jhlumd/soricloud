import React, { Component } from "react";
import { connect } from "react-redux";
import { seekPercentage } from "../../actions/track_player_actions";

class SeekBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ball: false
    };

    this.progBarRef = React.createRef();

    this.revealBall = this.revealBall.bind(this);
    this.hideBall = this.hideBall.bind(this);
    this.handlePercentage = this.handlePercentage.bind(this);
    this.changeSeekPercentage = this.changeSeekPercentage.bind(this);
  }

  componentDidUpdate() {
    this.progBarRef.current.value = `${this.props.percentage}`;
  }

  revealBall() {
    if (this.props.seekBarStyle === undefined) {
      this.setState({ ball: true });
    }
  }

  hideBall() {
    this.setState({ ball: false });
  }

  handlePercentage(e) {
    let newPercentage;
    const windowSize = (window.innerWidth - 1280) / 2;
    if (this.props.seekBarStyle === "long") {
      newPercentage = Math.floor(
        ((e.clientX - windowSize - e.currentTarget.offsetLeft * 1.5) /
          e.currentTarget.offsetWidth) *
          100
      );
    } else if (this.props.seekBarStyle === "medium") {
      newPercentage = Math.floor(
        ((e.clientX - windowSize + e.currentTarget.offsetLeft * 107) /
          e.currentTarget.offsetWidth) *
          100
      );
    } else {
      newPercentage = Math.floor(
        ((e.clientX - windowSize - e.currentTarget.offsetLeft * 1.25) /
          e.currentTarget.offsetWidth) *
          100
      );
    }
    this.props.seekPercentage(newPercentage);
  }

  changeSeekPercentage() {
    const newPercentage = parseInt(this.progBarRef.current.value, 10);
    this.props.seekPercentage(newPercentage);
  }

  render() {
    const { seekBarStyle, percentage } = this.props;

    return (
      <div
        className={`progress-bar-outer ${seekBarStyle}`}
        onClick={e => this.handlePercentage(e)}
        onMouseEnter={this.revealBall}
        onMouseLeave={this.hideBall}
      >
        <input
          ref={this.progBarRef}
          type="range"
          min="0"
          max="100"
          className={`progress-bar ${
            seekBarStyle === "long" ? "transparent" : ""
          } ${seekBarStyle === "medium" ? "white" : ""}`}
          onChange={this.changeSeekPercentage}
        />
        <button
          className={`ball ${this.state.ball ? "show" : ""}`}
          style={{
            left: `${seekBarStyle ? 0 : percentage * 0.99}%`
          }}
          onDrag={this.changeSeekPercentage}
        ></button>
      </div>
    );
  }
}

const mstp = state => {
  const { currentTime, duration } = state.ui.trackPlayer;
  const percentage = currentTime / duration * 100;
  return {
    percentage
  };
};

const mdtp = dispatch => ({
  seekPercentage: newPercentage => dispatch(seekPercentage(newPercentage))
});

export default connect(mstp, mdtp)(SeekBar);
