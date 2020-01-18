import React, { Component } from 'react';
import { connect } from 'react-redux';

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };

    this.waveformRef = React.createRef();
    this.wavesurfer = null;

    this.drawWave = this.drawWave.bind(this);
  }

  componentDidMount() {
    this.drawWave();
  }

  componentDidUpdate(prevProps, prevState) {
    const { percentage, active } = this.props;
    if (this.state.ready && active && percentage && percentage < 1) {
      this.wavesurfer.seekTo(percentage);
    } else {
      this.wavesurfer.seekTo(0);
    }
  }

  drawWave() {
    const interact = this.props.active;
    const { waveStyle, trackUrl } = this.props;

    if (waveStyle === "trackShow") {
      this.wavesurfer = WaveSurfer.create({
        container: this.waveformRef.current,
        waveColor: "#cdcfd1",
        progressColor: "#f50",
        cursorColor: "transparent",
        barGraph: 10,
        barWidth: 2,
        interact
      });
    } else if (waveStyle === "userShow") {
      this.wavesurfer = WaveSurfer.create({
        container: this.waveformRef.current,
        waveColor: "#8c8c8c",
        progressColor: "#f50",
        cursorColor: "transparent",
        barGraph: 10,
        barWidth: 2,
        barHeight: 0.5,
        interact
      });
    }

    this.wavesurfer.load(trackUrl);
    this.wavesurfer.on('ready', () => {
      this.setState({ ready: true });
    });
  }

  render() {
    // className instead of id? need unique identifier for each in userShow?
    return (
      <div
        ref={this.waveformRef}
        id={`${
          this.props.waveStyle === "trackShow"
            ? "waveform"
            : "waveform-small"
        }`}
      ></div>
    );
  }
}

const mstp = state => {
  const { duration, currentTime } = state.ui.trackPlayer;
  const percentage = currentTime / duration;
  return { percentage };
};

export default connect(mstp, null)(Waveform);
