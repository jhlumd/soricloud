import React, { Component } from 'react';
import { connect } from 'react-redux';

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };

    this.waveform = React.createRef();
    this.wavesurfer = null;
    this.trackUrl = props.trackUrl;

    this.drawWave = this.drawWave.bind(this);
  }

  drawWave() {
    
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mstp = state => {
  return {

  };
};

export default connect(mstp, null)(Waveform);
